import express from 'express';
import { bot } from './bot';
import { PORT, WEBHOOK_URL } from './constants/config';
import { BookmarkResponse } from './types';

export async function main() {
  const app = express();

  // bot.launch();
  console.log('🤖 Starting bot...');
  // Set the bot API endpoint
  app.use(await bot.createWebhook({ domain: WEBHOOK_URL }));
  app.use(express.json());

  app.get('/', (req, res) => {
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
