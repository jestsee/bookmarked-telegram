import { Markup } from 'telegraf';
import { BOOKMARKED_URL } from '../constants/config';

export const connectToNotionKeyboard = (botUsername: string) => {
  const botUrl = `https://t.me/${botUsername}?start=notion`;
  return Markup.inlineKeyboard([
    Markup.button.url(
      'Connect to Notion',
      `${BOOKMARKED_URL}/connect-to-notion?callbackUrl=${botUrl}`
    )
  ]);
};
