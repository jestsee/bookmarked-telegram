import { message } from 'telegraf/filters';
import { bot } from './bot';
import { authKeyboard } from './keyboard/auth';
import { isValidUUID } from './utils';
import { tokenExchange } from './api';

bot.command('auth', (ctx) => {
  const userId = ctx.update.message.from.id.toString();
  const botUsername = ctx.botInfo.username;
  ctx.reply(
    'You will be directed to an external website for sign-in.',
    authKeyboard(botUsername, userId)
  );
});

bot.start(async (ctx) => {
  if (ctx.payload && isValidUUID(ctx.payload)) {
    // token exchange
    ctx.reply('Please wait...');
    const { accessToken } = await tokenExchange(ctx.payload);
    ctx.session = { accessToken };
    ctx.reply('Successfully authenticated 🎉');
  }
});

bot.help((ctx) => ctx.reply(ctx.session?.accessToken ?? 'nah'));
bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));

bot.launch();
console.log('🤖 Starting bot...');

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

/**
 * TODO for production
 * need to compile first
 * then run its .js compiled file
 * deploy tutorial: https://blog.devgenius.io/deploying-a-telegram-bot-developed-with-telegraf-js-aef341ec0d4f
 */
