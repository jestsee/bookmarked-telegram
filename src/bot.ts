import { Telegraf } from "telegraf";
import "dotenv/config";

const botToken = process.env.BOT_TOKEN;

if (!botToken) {
  console.log("Bot token doesn't exist");
  process.exit();
}

export const bot = new Telegraf(botToken);
