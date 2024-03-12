import { message } from "telegraf/filters";
import { bot } from "./bot";
import { authKeyboard } from "./keyboard/auth";

bot.command("auth", (ctx) => {
  // TODO check if user already signed in
  ctx.reply("You will be directed to external web for sign in", authKeyboard);
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

/**
 * TODO for production
 * need to compile first
 * then run its .js compiled file
 * deploy tutorial: https://blog.devgenius.io/deploying-a-telegram-bot-developed-with-telegraf-js-aef341ec0d4f
 */
