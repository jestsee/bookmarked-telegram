import { Telegraf } from "telegraf"
import { callbackQuery, message } from "telegraf/filters"
import { commandMessage, isContainTweetUrl, tweetTypeOptions } from "./utils"
import { Message } from "telegraf/types"
import { State, StateEnum, TweetType } from "./entities"

export function startBot() {
  const botToken = process.env.BOT_TOKEN

  if (!botToken) return

  // initialize
  const bot = new Telegraf(botToken)
  const state = new State()

  // TODO how to use
  bot.start((ctx) => ctx.reply(`Welcome ${ctx.message.from.first_name}!`))
  bot.help((ctx) => ctx.reply("Send me a sticker"))

  // TODO sign up

  // TODO sign in

  bot.on(message("text"), (ctx) => {
    const message = ctx.message.text

    // TODO isContainTweetUrl nya keknya bisa di taroh di kelas?
    if (isContainTweetUrl(message)) {
      state.mode({ state: StateEnum.BOOKMARK, payload: { message } })

      // check if it's containing #thread or #tweet
      if (!state.bookmark.type) {
        ctx.reply(commandMessage.tweetType, tweetTypeOptions)
      }

      // check if it's containing tags
      if (!state.bookmark.type && state.bookmark.tags.length === 0) {
        ctx.reply(commandMessage.tags)
      }

      // TODO kalo type sama tagsnya ada maka langsung proses

      state.bookmark.log()
    }

    // not containing tweet link
    else {
      console.log(JSON.stringify(ctx.message))
    }
  })

  bot.on(callbackQuery("data"), (ctx) => {
    const resp = ctx.callbackQuery
    const text = (resp.message as Message.TextMessage).text

    switch (text) {
      case commandMessage.tweetType:
        state.bookmark.setType(resp.data as TweetType)
        break

      default:
        break
    }

    state.bookmark.log()

    // check if it's containing tags
    if (state.bookmark.type && state.bookmark.tags.length === 0) {
      ctx.editMessageText(commandMessage.tags)
    } else {
      ctx.editMessageText("aha")
    }
  })

  bot.on(message("sticker"), (ctx) => ctx.reply("👍"))
  bot.hears("hey", (ctx) => ctx.reply("Hey there"))
  bot.launch()
}

// deploy
// https://blog.devgenius.io/deploying-a-telegram-bot-developed-with-telegraf-js-aef341ec0d4f

// TODO save state?
/**
 * 1. cuma ada 1 state pada suatu waktu
 * 2. ganti command otomatis ganti state
 */
