import express from 'express';
import { bot } from './bot';
import { BOT_URL, PORT } from './constants/config';
import { BookmarkResponse } from './types';

export async function main() {
  const app = express();

  // bot
  //   .launch({ webhook: { domain: BOT_URL } })
  //   .then(() => console.log('🤖 Starting bot...'));

  app.use(express.json());

  app.use(await bot.createWebhook({ domain: BOT_URL, path: '/bot' }));

  app.get('/hi', (req, res) => {
    bot.telegram.sendMessage(5721146079, 'annyeong');
    res.send('Uses This Bot');
  });

  app.post('/notification', (req, res) => {
    console.log('masok notif', req.body);
    const { additionalData, ...rest } = req.body as BookmarkResponse;
    bot.telegram.sendMessage(
      additionalData.chatId,
      `Success! ✅ Your bookmark has been saved. Access it [here](${rest.notionPageUrl})`,
      {
        reply_parameters: { message_id: additionalData.messageId },
        parse_mode: 'Markdown'
      }
    );
    res.send('Received');
  });

  app.listen(PORT, () => console.log('Listening on port', PORT));
}
