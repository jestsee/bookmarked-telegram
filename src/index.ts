import { message } from 'telegraf/filters';
import { bot } from './bot';
import { authKeyboard } from './keyboard/auth';
import { getTweetUrl } from './utils';
import { WizardEnum } from './constants/enum';
import { main } from './webhook';
import { pool } from './db/pool';
import { getToken } from './db/get-token';

bot.command('auth', async (ctx) => {
  if (ctx.session?.accessToken) {
    return ctx.reply('You have already authenticated');
  }

  const accessToken = await getToken(ctx.from?.id.toString() ?? '');
  if (accessToken) {
    ctx.session = { accessToken };
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
  if (ctx.payload && ctx.payload === 'success') {
    return ctx.reply('Successfully authenticated 🎉');
  }

  return ctx.reply(
    'Hello! 👋🏼 To start bookmarking tweets, you need to be authenticated first'
  );
});

bot.on(message('text'), async (ctx) => {
  const tweetUrl = getTweetUrl(ctx.text);
  if (tweetUrl) {
    await ctx.scene.leave(); // leave the current scene
    ctx.scene.session.bookmarkPayload = {
      url: tweetUrl,
      messageId: ctx.message.message_id
    };
    return ctx.scene.enter(WizardEnum.BOOKMARK);
  }
});

bot.help((ctx) => ctx.reply(ctx.session?.accessToken ?? 'nah'));

main();

// Enable graceful stop
process.once('SIGINT', () => {
  console.log('shutting down...😴');
  bot.stop('SIGINT');
  pool.end();
  process.exit(0);
});
process.once('SIGTERM', () => bot.stop('SIGTERM'));
