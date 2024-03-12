import "dotenv/config";

const BOT_TOKEN = process.env.BOT_TOKEN!;
const BOOKMARKED_URL = process.env.BOOKMARKED_URL!;

if (!BOT_TOKEN || !BOOKMARKED_URL) {
  console.log("⚠️ Please check your environment variables!");
  process.exit();
}

export { BOT_TOKEN, BOOKMARKED_URL };
