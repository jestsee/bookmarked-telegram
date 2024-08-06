import { Middleware } from 'telegraf';
import { CustomContext } from '../types';
import { getSession } from '../db/get-token';

const tokenMiddleware: Middleware<CustomContext> = async (ctx, next) => {
  if (!ctx.session?.accessToken && ctx.text !== '/auth') {
    const accessToken = await getSession(ctx.from?.id.toString() ?? '');
    console.log('masok token middleware', accessToken);

    if (!accessToken) {
      return ctx.reply('Please sign in first for using this bot service');
    }
    ctx.session = { accessToken };
  }

  return next();
};

export default tokenMiddleware;
