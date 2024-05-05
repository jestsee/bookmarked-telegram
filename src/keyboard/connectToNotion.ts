import { Markup } from 'telegraf';
import { NOTION_AUTHORIZATION_URL } from '../constants/config';

export const connectToNotionKeyboard = (botUsername: string) => {
  const encoded = encodeURIComponent(`t.me/${botUsername}`);
  return Markup.inlineKeyboard([
    Markup.button.url(
      'Connect to Notion',
      `${NOTION_AUTHORIZATION_URL}state=${encoded}`
    )
  ]);
};
