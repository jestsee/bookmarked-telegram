import { Composer } from 'telegraf';
import { CustomContext } from '../../types';
import { ResponseOptionsEnum } from '../../constants/enum';
import { execute } from '../../utils/utils';

const tagHandler = new Composer<CustomContext>();

tagHandler.action(ResponseOptionsEnum.YES, async (ctx) => {
  await ctx.reply(
    'Add your tags separate by comma, ex: fashion, beauty, skin care'
  );
  ctx.wizard.next();
});

tagHandler.action(ResponseOptionsEnum.NO, (ctx) => {
  ctx.wizard.next().next();
  execute(ctx);
});

export default tagHandler;
