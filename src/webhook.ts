import express from 'express';
import { bot } from './bot';
import { BOT_URL, PORT } from './constants/config';
import { handleError, sendSuccessMessage } from './utils/helper';

export async function main() {
  const app = express();
  app.use(express.json());
  app.use(await bot.createWebhook({ domain: BOT_URL, path: '/bot' }));

  app.get('/hi', (req, res) => {
    bot.telegram.sendMessage(5721146079, 'annyeong');
    res.send('Uses This Bot');
  });

  app.post('/notification', async (req, res) => {
    console.log('masok notif', req.body);

    if (req.body.type === 'success') {
      return sendSuccessMessage(req.body);
    }

    return handleError(req.body);
  });

  app.listen(PORT, () => console.log('Listening on port', PORT));
}
