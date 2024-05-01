import { BookmarkPayload } from '../../types';

type ReplyMessagePayload = Omit<BookmarkPayload, 'messageId' | 'url'>;

export const constructReplyMessage = ({ type, tags }: ReplyMessagePayload) => {
  let message = `Bookmarking this ${type}...⏳\n`;

  if (tags?.length && tags.length > 0) {
    message += `tags: ${tags.join(', ')}\n`;
  }
  message += `We will notify you when it's finish 🔥`;

  return message;
};
