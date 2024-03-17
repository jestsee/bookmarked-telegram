import { BOOKMARKED_URL } from './constants/config';
import { BookmarkPayload, CustomSession } from './types';

export const tokenExchange = async (token: string) => {
  const headers = new Headers({
    'Content-Type': 'application/json'
  });
  const response = await fetch(`${BOOKMARKED_URL}/api/token`, {
    method: 'POST',
    body: JSON.stringify({ token }),
    headers
  });

  return response.json() as Promise<CustomSession>;
};

export const bookmark = async (payload: BookmarkPayload, token: string) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  });
  const response = await fetch(`${BOOKMARKED_URL}/api/bookmark-tweet`, {
    method: 'POST',
    body: JSON.stringify({ ...payload, url: 'https://' + payload.url }),
    headers
  });

  return response.json();
};
