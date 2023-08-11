import { Telegraf } from "telegraf"
import { message } from "telegraf/filters"

export function startBot() {
  const botToken = process.env.BOT_TOKEN

  if (!botToken) return

  const bot = new Telegraf(botToken)
  bot.start((ctx) => ctx.reply("Welcome"))
  bot.help((ctx) => ctx.reply("Send me a sticker"))
  bot.on(message("sticker"), (ctx) => ctx.reply("👍"))
  bot.hears("hi", (ctx) => ctx.reply("Hey there"))
  bot.launch()
}
