import { Telegraf, session } from 'telegraf';
import 'dotenv/config';
import { commands } from './commands';
import { BOT_TOKEN } from './config';
import { CustomContext } from './types';

export const bot = new Telegraf<CustomContext>(BOT_TOKEN);

bot.use(session());
bot.telegram.setMyCommands(commands);
