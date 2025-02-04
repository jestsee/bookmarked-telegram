import { BookmarkType, CustomContext } from '../types';

export const getTweetUrl = (value: string) => {
  const regexExp = /(?:twitter\.com|x\.com)\/[^\s]+/;
  const matches = value.match(regexExp);
  return matches ? matches[0] : null;
};

export const getBookmarkType = (value: string): BookmarkType | null => {
  const regexExp = /\b(tweet|thread)\b/i;
  const matches = value.match(regexExp);
  return matches ? (matches[0].toLowerCase() as BookmarkType) : null;
};

export const execute = (ctx: CustomContext) => {
  const next = async () => {
    ctx.wizard.next();
  };
  typeof ctx.wizard.step === 'function' && ctx.wizard.step(ctx, next);
};
