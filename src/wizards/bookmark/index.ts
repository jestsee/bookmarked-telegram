import { Scenes } from 'telegraf';
import { WizardEnum } from '../../constants/enum';
import { CustomContext } from '../../types';
import { bookmarkTypeKeyboard } from '../../keyboard/bookmark-type';
import { execute, getBookmarkType } from '../../utils';
import bookmarkTypeHandler from './bookmark-type.composer';
import { yesNoKeyboard } from '../../keyboard/yes-no-options';
import tagHandler from './tag.composer';

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
    await ctx.reply(
      `Processing your bookmark\n
        url: ${ctx.scene.session.bookmarkPayload.url}
        type: ${ctx.scene.session.bookmarkPayload.type}
        tags: ${ctx.scene.session.bookmarkPayload.tags?.join(', ') ?? '-'}
      `
    );
    return await ctx.scene.leave();
  }
);

export default bookmarkWizard;
