import { pool } from './pool';

export const getToken = async (telegramId: string): Promise<string> => {
  try {
    const result = await pool.query(
      'SELECT session FROM "connectedAccount" WHERE "accountId" = $1::text',
      [telegramId]
    );
    console.log('masok result', JSON.stringify(result, null, 2));
    return result.rows[0]?.session;
  } catch (error) {
    console.error('Error fetching token', error);
    throw error;
  }
};
