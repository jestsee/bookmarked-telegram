import { message } from "telegraf/filters";
import { bot } from "./bot";

export function startBot() {
  bot.command("auth", (ctx) => {
    ctx.reply("masok auth");
  });

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
