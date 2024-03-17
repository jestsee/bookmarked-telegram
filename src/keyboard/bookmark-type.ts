import { Markup } from 'telegraf';
import { BookmarkTypeEnum } from '../constants/enum';

export const bookmarkTypeKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('Tweet', BookmarkTypeEnum.TWEET),
  Markup.button.callback('Thread', BookmarkTypeEnum.THREAD)
]);
