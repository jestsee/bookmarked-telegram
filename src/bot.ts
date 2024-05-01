import 'dotenv/config';
import { Scenes, Telegraf, session } from 'telegraf';
import { commands } from './commands';
import { BOT_TOKEN } from './constants/config';
import { CustomContext } from './types';
import bookmarkWizard from './wizards/bookmark';
import tokenMiddleware from './middleware/token-middleware';

const bot = new Telegraf<CustomContext>(BOT_TOKEN, {
  telegram: { webhookReply: false }
});

const stage = new Scenes.Stage<CustomContext>([bookmarkWizard]);

bot.use(session(), stage.middleware(), tokenMiddleware);
bot.telegram.setMyCommands(commands);

export { bot };
