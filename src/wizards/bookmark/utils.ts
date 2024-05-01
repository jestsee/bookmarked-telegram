import { BookmarkPayload } from '../../types';

export const constructReplyMessage = ({ type, url, tags }: BookmarkPayload) => {
  let message = `Bookmarking this [${type}](${url})\n`;

  if (tags?.length && tags.length > 0) {
    message += `tags: ${tags.join(', ')}\n`;
  }
  message += `We will notify you when it's finish🔥`;

  return message;
};
