import { Composer, Scenes } from 'telegraf';
import { BookmarkTypeEnum, WizardEnum } from '../constants/enum';
import { CustomContext } from '../types';
import { bookmarkTypeKeyboard } from '../keyboard/bookmark-type';
import { getBookmarkType } from '../utils';

const bookmarkTypeHandler = new Composer<CustomContext>();

const execute = (ctx: CustomContext) => {
  const next = async () => {
    await ctx.wizard.next();
  };
  typeof ctx.wizard.step === 'function' && ctx.wizard.step(ctx, next);
};

const setBookmarkTypeHandler = (type: BookmarkTypeEnum) => {
  bookmarkTypeHandler.action(type, async (ctx) => {
    await ctx.reply(`step ${ctx.wizard.cursor}`);

    ctx.scene.session.bookmarkPayload.type = type;
    ctx.wizard.next();
    execute(ctx);
  });
};

setBookmarkTypeHandler(BookmarkTypeEnum.TWEET);
setBookmarkTypeHandler(BookmarkTypeEnum.THREAD);

/**
 * STEP: tweet url -> type -> tag
 * if type attached then jump to tag step
 */
const bookmarkWizard = new Scenes.WizardScene<CustomContext>(
  WizardEnum.BOOKMARK,
  async (ctx) => {
    await ctx.reply(`step ${ctx.wizard.cursor}`);

    const bookmarkType = getBookmarkType(ctx.text ?? '');
    if (bookmarkType) {
      ctx.scene.session.bookmarkPayload.type = bookmarkType;
      ctx.wizard.selectStep(2);
      return execute(ctx);
    }

    await ctx.reply('Choose your bookmark type', bookmarkTypeKeyboard);
    ctx.wizard.next();
  },

  bookmarkTypeHandler,

  async (ctx) => {
    await ctx.reply(`step ${ctx.wizard.cursor}`);

    // ctx.reply('Do you want to add some tags?');
    await ctx.reply(
      `nih ${JSON.stringify(ctx.scene.session.bookmarkPayload, null, 2)}`
    );
    return await ctx.scene.leave();
  }
);

export default bookmarkWizard;
