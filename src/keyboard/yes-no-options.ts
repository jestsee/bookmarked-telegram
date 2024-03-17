import { Markup } from 'telegraf';
import { ResponseOptionsEnum } from '../constants/enum';

export const yesNoKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('Yes', ResponseOptionsEnum.YES),
  Markup.button.callback('No', ResponseOptionsEnum.NO)
]);
