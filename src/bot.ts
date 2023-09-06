import { Telegraf } from "telegraf"
import { callbackQuery, message } from "telegraf/filters"
import { commandMessage, isContainTweetUrl, tweetTypeOptions } from "./utils"
import { Message } from "telegraf/types"

export function startBot() {
  const botToken = process.env.BOT_TOKEN

  if (!botToken) return

  const bot = new Telegraf(botToken)

  // TODO how to use
  bot.start((ctx) => ctx.reply(`Welcome ${ctx.message.from.first_name}!`))
  bot.help((ctx) => ctx.reply("Send me a sticker"))

  // TODO sign up

  // TODO sign in

  // bookmark process
  let type: string | undefined
  let tags: string[] = []

  bot.on(message("text"), (ctx) => {
    const message = ctx.message.text
    if (isContainTweetUrl(message)) {
      // reset type & tags
      type = undefined
      tags = []

      // get all keyword prepended with #
      const keywords = message.match(/#\w+/g)

      keywords?.forEach((item) => {
        const keyword = item.substring(1).toLowerCase()
        if (keyword === "thread" || keyword === "tweet") {
          type = keyword // TODO kalo ada dua2nya gimana?
        } else {
          tags.push(keyword)
        }
      })

      // check if it's containing #thread or #tweet
      if (!type) {
        ctx.reply(commandMessage.tweetType, tweetTypeOptions)
      }

      // check if it's containing tags
      if (type && tags.length === 0) {
        ctx.reply(commandMessage.tags)
      }

      // TODO kalo type sama tagsnya ada maka langsung proses

      console.log({ keywords, type })
    }
  })

  bot.on(callbackQuery("data"), (ctx) => {
    const resp = ctx.callbackQuery
    const text = (resp.message as Message.TextMessage).text

    switch (text) {
      case commandMessage.tweetType: // TODO refactor
        type = resp.data
        break

      default:
        break
    }

    console.log({ type })

    // check if it's containing tags
    if (type && tags.length === 0) {
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
