import { Markup } from "telegraf";
import { BOOKMARKED_URL } from "../config";

export const authKeyboard = Markup.inlineKeyboard([
  Markup.button.url("Sign in", `${BOOKMARKED_URL}/redirect/telegram-bot`),
]);
