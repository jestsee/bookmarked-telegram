import { Scenes, Telegraf, session } from 'telegraf';
import 'dotenv/config';
import { commands } from './commands';
import {
  BOT_TOKEN,
  PGDATABASE,
  PGHOST,
  PGPASSWORD,
  PGUSER
} from './constants/config';
import { CustomContext, CustomSession } from './types';
import bookmarkWizard from './wizards/bookmark';
import { Postgres } from '@telegraf/session/pg';

const store = Postgres<CustomSession>({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  config: {
    ssl: {
      rejectUnauthorized: false
    }
  }
});

const bot = new Telegraf<CustomContext>(BOT_TOKEN);

const stage = new Scenes.Stage<CustomContext>([bookmarkWizard]);

bot.use(session({ store }));
bot.use(stage.middleware());
bot.telegram.setMyCommands(commands);

export { bot };
