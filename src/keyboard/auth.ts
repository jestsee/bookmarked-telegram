import { Markup } from 'telegraf';
import { BOOKMARKED_URL } from '../config';

export const authKeyboard = (botUsername: string, telegramId: string) => {
  return Markup.inlineKeyboard([
    Markup.button.url(
      'Sign in',
      `${BOOKMARKED_URL}/redirect/telegram?bot=${botUsername}&telegramId=${telegramId}`
    )
  ]);
};
