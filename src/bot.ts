import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

export function startBot() {
  const botToken = process.env.BOT_TOKEN;

  if (!botToken) {
    console.log("Bot token doesn't exist");
    return;
  }

  const bot = new Telegraf(botToken);
  bot.start((ctx) => ctx.reply("Welcome"));
  bot.help((ctx) => ctx.reply("Send me a sticker"));
  bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
  bot.hears("hi", (ctx) => ctx.reply("Hey there"));

  bot.launch();
  console.log("🤖 Starting bot...");

  // Enable graceful stop
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}

// deploy
// https://blog.devgenius.io/deploying-a-telegram-bot-developed-with-telegraf-js-aef341ec0d4f
