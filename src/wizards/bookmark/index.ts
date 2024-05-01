import { Scenes } from 'telegraf';
import { WizardEnum } from '../../constants/enum';
import { CustomContext } from '../../types';
import { bookmarkTypeKeyboard } from '../../keyboard/bookmark-type';
import { execute, getBookmarkType } from '../../utils';
import bookmarkTypeHandler from './bookmark-type.composer';
import { yesNoKeyboard } from '../../keyboard/yes-no-options';
import tagHandler from './tag.composer';
import { bookmark } from '../../api/bookmark';
import { constructReplyMessage } from './utils';

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
    const { message_id } = await ctx.reply(
      constructReplyMessage(bookmarkPayload),
      {
        parse_mode: 'Markdown',
        link_preview_options: {
          show_above_text: true,
          prefer_small_media: true
        }
      }
    );

    const resp = await bookmark(
      ctx.scene.session.bookmarkPayload,
      ctx.session?.accessToken!,
      {
        messageId: message_id,
        chatId: ctx.chat?.id!
      }
    );
    console.log(JSON.stringify(resp, null, 2));

    return ctx.scene.leave();
  }
);

export default bookmarkWizard;
