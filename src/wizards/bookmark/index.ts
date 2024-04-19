import { Scenes } from 'telegraf';
import { WizardEnum } from '../../constants/enum';
import { CustomContext } from '../../types';
import { bookmarkTypeKeyboard } from '../../keyboard/bookmark-type';
import { execute, getBookmarkType } from '../../utils';
import bookmarkTypeHandler from './bookmark-type.composer';
import { yesNoKeyboard } from '../../keyboard/yes-no-options';
import tagHandler from './tag.composer';
import { bookmark } from '../../api';

/**
 * Bookmark Wizard
 */
const bookmarkWizard = new Scenes.WizardScene<CustomContext>(
  WizardEnum.BOOKMARK,
  async (ctx) => {
    const bookmarkType = getBookmarkType(ctx.text ?? '');
    if (bookmarkType) {
      ctx.scene.session.bookmarkPayload.type = bookmarkType;
      ctx.wizard.next().next();
      return execute(ctx);
    }

    await ctx.reply('Choose your bookmark type', bookmarkTypeKeyboard);
    ctx.wizard.next();
  },

  bookmarkTypeHandler,

  async (ctx) => {
    ctx.reply('Do you want to add some tags?', yesNoKeyboard);
    ctx.wizard.next();
  },

  tagHandler,

  async (ctx) => {
    ctx.scene.session.bookmarkPayload.tags = ctx.text
      ?.split(',')
      .map((tag) => tag.trim());
    ctx.wizard.next();
    execute(ctx);
  },

  async (ctx) => {
    await ctx.reply('Please wait...⏳');

    const resp = await bookmark(
      ctx.scene.session.bookmarkPayload,
      ctx.session?.accessToken!
    );
    console.log(JSON.stringify(resp, null, 2));

    await ctx.reply(
      `Processing your bookmark 📖\nurl: ${
        ctx.scene.session.bookmarkPayload.url
      }\ntype: ${ctx.scene.session.bookmarkPayload.type}\ntags: ${
        ctx.scene.session.bookmarkPayload.tags?.join(', ') ?? '-'
      }\nWe will notify you when it's finish
      `
    );
    return await ctx.scene.leave();
  }
);

export default bookmarkWizard;
