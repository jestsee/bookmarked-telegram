import { Scenes, Telegraf, session } from 'telegraf';
import 'dotenv/config';
import { commands } from './commands';
import { BOT_TOKEN } from './constants/config';
import { CustomContext } from './types';
import bookmarkWizard from './wizards/bookmark';

export const bot = new Telegraf<CustomContext>(BOT_TOKEN);

// TODO remove later; for development purpose only
const temp = {
  defaultSession: () => ({
    accessToken:
      'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..gRLkTZnglKxiuKdi.iGOyuMsK6MExrDSf9wvNwlUk7L3aCdb-Dokg7T7tfhjqIRQo3GcrAdqjijtu-2ZD1ZWSApJ3XZSOeJt9_kf-uFaPGL7k5ObUQ8XkTwd00hU0-5nMb9XdRz-RWwq8sRKcrnWNnjr7eKPXUTrD37tPuRS8EdTkpqxeOlBqHpAXk6aUMPVjH487jsbszvG9gUHK4Jgn89FeniBTA-HWhNGc2ge3BysiRPDn6mIyeOdX5cSdxvY.p-PzTP-7Gu8dcjbm4M-uOQ'
  })
};

const stage = new Scenes.Stage<CustomContext>([bookmarkWizard]);

bot.use(session(temp));
bot.use(stage.middleware());
bot.telegram.setMyCommands(commands);
