import { message } from 'telegraf/filters';
import { bot } from './bot';
import { authKeyboard } from './keyboard/auth';
import { getTweetUrl, isValidUUID } from './utils';
import { tokenExchange } from './api';
import { WizardEnum } from './constants/enum';
import { main } from './webhook';

bot.command('auth', (ctx) => {
  if (ctx.session?.accessToken) {
    return ctx.reply('You have already authenticated');
  }
  const userId = ctx.update.message.from.id.toString();
  const botUsername = ctx.botInfo.username;
  return ctx.reply(
    'You will be directed to an external website for sign in.',
    authKeyboard(botUsername, userId)
  );
});

bot.start(async (ctx) => {
  if (ctx.payload && isValidUUID(ctx.payload)) {
    // token exchange
    await ctx.reply('Please wait...');
    const { accessToken } = await tokenExchange(ctx.payload);
    ctx.session = { accessToken };
    return ctx.reply('Successfully authenticated 🎉');
  }
  return ctx.reply('Please sign in first for using this bot service');
});

bot.on(message('text'), async (ctx) => {
  const tweetUrl = getTweetUrl(ctx.text);
  if (tweetUrl) {
    if (!ctx.session?.accessToken) {
      return ctx.reply('Please sign in first for using this bot service');
    }

    ctx.scene.session.bookmarkPayload = { url: tweetUrl };
    return ctx.scene.enter(WizardEnum.BOOKMARK);
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
