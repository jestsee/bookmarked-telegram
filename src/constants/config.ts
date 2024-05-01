import 'dotenv/config';

const BOT_TOKEN = process.env.BOT_TOKEN!;
const BOOKMARKED_URL = process.env.BOOKMARKED_URL!;
const PORT = process.env.PORT!;
const BOT_URL = process.env.BOT_URL!;
const DATABASE_URL = process.env.DATABASE_URL!;

if (!BOT_TOKEN || !BOOKMARKED_URL || !PORT || !BOT_URL || !DATABASE_URL) {
  console.log('⚠️ Please check your environment variables!');
  process.exit();
}

export { BOT_TOKEN, BOOKMARKED_URL, PORT, BOT_URL, DATABASE_URL };
