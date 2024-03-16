import { BOOKMARKED_URL } from './config';

const headers = new Headers({
  'Content-Type': 'application/json'
});

export const tokenExchange = async (token: string) => {
  const response = await fetch(`${BOOKMARKED_URL}/api/token`, {
    method: 'POST',
    body: JSON.stringify({ token }),
    headers
  });

  return response.json() as Promise<{ accessToken: string }>;
};
