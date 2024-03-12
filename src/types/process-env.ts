declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      BOT_TOKEN: string | undefined;
      BOT_USERNAME: string | undefined;
      BOOKMARKED_URL: string | undefined;
      // add more environment variables and their types here
    }
  }
}
