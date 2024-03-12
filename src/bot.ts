import { Telegraf } from "telegraf";
import "dotenv/config";
import { commands } from "./commands";
import { BOT_TOKEN } from "./config";

export const bot = new Telegraf(BOT_TOKEN);

bot.telegram.setMyCommands(commands);
