import { Scenes, Telegraf, session } from 'telegraf';
import 'dotenv/config';
import { commands } from './commands';
import { BOT_TOKEN, PORT } from './constants/config';
import { CustomContext } from './types';
import bookmarkWizard from './wizards/bookmark';
import express from 'express';

// TODO remove later; for development purpose only
const temp = {
  defaultSession: () => ({
    accessToken:
      'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..m5jyVaTLHmCIHO4a.Woo-g--H6ER3gsdpH1ojUawM_JTYt0-37wQwC57PWaDgQ_xe8c1gJW5XKP--dL4do8tzHtV7-98SdcDCQb83P6o3UdC9n70W6YwF1h6FdFpiWkF030LVwu3xLuXbc08JEJruY6iqT1xuL-ZMLGfVpNj6uTd1WmjC3fZ6tYtxtbpBRoFFkh7Xob_JpJUM-bK8a5vWqYParadgysU5ddjFhQW3plc7ik62h2osBziq_OQKgg.9BVLOjEE1MTThFoCYV7umw'
  })
};
export const bot = new Telegraf<CustomContext>(BOT_TOKEN);

const app = express();

app.get('/', (req, res) => {
  bot.telegram.sendMessage(5721146079, 'oioioio');
  res.send('Uses This Bot');
});

app.post('/notification', (req, res) => {
  console.log(req.body);
  res.send('Received');
});

app.listen(PORT, () => console.log('Listening on port', PORT));

const stage = new Scenes.Stage<CustomContext>([bookmarkWizard]);

bot.use(session(temp));
bot.use(stage.middleware());
bot.telegram.setMyCommands(commands);
