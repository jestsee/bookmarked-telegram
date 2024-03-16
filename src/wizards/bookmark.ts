import { Scenes } from 'telegraf';
import { WizardEnum } from '../constants/enum';
import { CustomContext } from '../types';
import { bookmarkTypeKeyboard } from '../keyboard/bookmark-type';

/**
 * STEP: tweet url -> type -> tag
 * if type attached then jump to tag step
 */
const bookmarkWizard = new Scenes.WizardScene<CustomContext>(
  WizardEnum.Bookmark,
  (ctx) => {
    const includeType = ['tweet', 'thread'].some((type) =>
      ctx.text?.includes(type)
    );
    if (includeType) ctx.wizard.next();
    ctx.reply('Choose your bookmark type', bookmarkTypeKeyboard);
  }
);

export default bookmarkWizard;
