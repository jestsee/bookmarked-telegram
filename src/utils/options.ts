import { Markup } from "telegraf"

export const tweetTypeOptions = Markup.inlineKeyboard([
  Markup.button.callback("Tweet", "tweet"),
  Markup.button.callback("Thread", "thread"),
])
