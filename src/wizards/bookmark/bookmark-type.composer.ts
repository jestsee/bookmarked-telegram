import { Composer } from 'telegraf';
import { CustomContext } from '../../types';
import { BookmarkTypeEnum } from '../../constants/enum';
import { execute } from '../../utils';

const bookmarkTypeHandler = new Composer<CustomContext>();

const setBookmarkTypeHandler = (type: BookmarkTypeEnum) => {
  bookmarkTypeHandler.action(type, async (ctx) => {
    ctx.scene.session.bookmarkPayload.type = type;
    ctx.wizard.next();
    execute(ctx);
  });
};

setBookmarkTypeHandler(BookmarkTypeEnum.TWEET);
setBookmarkTypeHandler(BookmarkTypeEnum.THREAD);

export default bookmarkTypeHandler;
