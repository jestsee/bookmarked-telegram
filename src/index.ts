import { message } from 'telegraf/filters';
import { bot } from './bot';
import { authKeyboard } from './keyboard/auth';
import { getTweetUrl, isValidUUID } from './utils';
import { tokenExchange } from './api';
import { WizardEnum } from './constants/enum';
import { main } from './webhook';

bot.command('auth', (ctx) => {
  const userId = ctx.update.message.from.id.toString();
  const botUsername = ctx.botInfo.username;
  ctx.reply(
    'You will be directed to an external website for sign in.',
    authKeyboard(botUsername, userId)
  );
});

bot.start(async (ctx) => {
  if (ctx.payload && isValidUUID(ctx.payload)) {
    // token exchange
    ctx.reply('Please wait...');
    const { accessToken } = await tokenExchange(ctx.payload);
    ctx.session = { accessToken };
    return ctx.reply('Successfully authenticated 🎉');
  }
  ctx.reply('Please sign in first for using this bot service');
});

// TODO implement middleware to check whether the token exist
bot.on(message('text'), (ctx) => {
  const tweetUrl = getTweetUrl(ctx.text);
  if (tweetUrl) {
    ctx.scene.session.bookmarkPayload = { url: tweetUrl };
    ctx.scene.enter(WizardEnum.BOOKMARK);
  }
});

bot.help((ctx) => ctx.reply(ctx.session?.accessToken ?? 'nah'));

main();

// Enable graceful stop
process.once('SIGINT', () => {
  bot.stop('SIGINT');
  process.exit(0);
});
process.once('SIGTERM', () => bot.stop('SIGTERM'));

/**
 * TODO for production
 * need to compile first
 * then run its .js compiled file
 * deploy tutorial: https://blog.devgenius.io/deploying-a-telegram-bot-developed-with-telegraf-js-aef341ec0d4f
 */
