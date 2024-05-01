import { BOOKMARKED_URL, BOT_URL } from '../constants/config';
import { AdditionalData, BookmarkPayload } from '../types';

export const bookmark = async (
  payload: BookmarkPayload,
  token: string,
  additionalData: AdditionalData
) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  });

  const body = {
    ...payload,
    url: 'https://' + payload.url,
    additionalData,
    callbackUrl: `${BOT_URL}/notification`
  };

  const response = await fetch(`${BOOKMARKED_URL}/api/bookmark-tweet`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers
  });

  return response.json();
};
