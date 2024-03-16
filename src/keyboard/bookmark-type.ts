import { Markup } from 'telegraf';

export const bookmarkTypeKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('Tweet', 'tweet'),
  Markup.button.callback('Thread', 'thread')
]);
