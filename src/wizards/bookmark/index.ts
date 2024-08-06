import { Scenes } from 'telegraf';
import { WizardEnum } from '../../constants/enum';
import { CustomContext } from '../../types';
import { bookmarkTypeKeyboard } from '../../keyboard/bookmark-type';
import { execute, getBookmarkType } from '../../utils/utils';
import bookmarkTypeHandler from './bookmark-type.composer';
import { yesNoKeyboard } from '../../keyboard/yes-no-options';
import tagHandler from './tag.composer';
import { bookmark } from '../../api/bookmark';
import { constructReplyMessage } from './utils';
import { removeSession } from '../../db/get-token';

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
    await ctx.reply('Do you want to add some tags?', yesNoKeyboard);
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
    const { bookmarkPayload } = ctx.scene.session;
    await ctx.reply(constructReplyMessage(bookmarkPayload), {
      reply_parameters: { message_id: bookmarkPayload.messageId }
    });

    const response = (await bookmark(
      ctx.scene.session.bookmarkPayload,
      ctx.session?.accessToken!,
      {
        messageId: bookmarkPayload.messageId,
        chatId: ctx.chat?.id!
      }
    )) as any;

    if (response.code === 'BAD_REQUEST') {
      await ctx.reply(response.message ?? 'Something went wrong');
    }

    if (response.code === 'UNAUTHORIZED') {
      await removeSession(ctx.from?.id.toString() ?? '');
      ctx.session = { accessToken: undefined }; // remove the token from the session
      return ctx.reply('Your session has expired. Please sign in again');
    }

    console.log(JSON.stringify(response, null, 2));

    return ctx.scene.leave();
  }
);

export default bookmarkWizard;
