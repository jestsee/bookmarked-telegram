import 'dotenv/config';

const BOT_TOKEN = process.env.BOT_TOKEN!;
const BOOKMARKED_URL = process.env.BOOKMARKED_URL!;
const PORT = process.env.PORT!;
const BOT_URL = process.env.BOT_URL!;

const PGHOST = process.env.PGHOST!;
const PGDATABASE = process.env.PGDATABASE!;
const PGUSER = process.env.PGUSER!;
const PGPASSWORD = process.env.PGPASSWORD!;

if (!BOT_TOKEN || !BOOKMARKED_URL || !PORT || !BOT_URL) {
  console.log('⚠️ Please check your environment variables!');
  process.exit();
}

if (!PGHOST || !PGDATABASE || !PGUSER || !PGPASSWORD) {
  console.log('⚠️ Please check your db credentials!');
  process.exit();
}

export { BOT_TOKEN, BOOKMARKED_URL, PORT, BOT_URL };
export { PGDATABASE, PGHOST, PGPASSWORD, PGUSER };
