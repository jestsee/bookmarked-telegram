import { Context } from 'telegraf';

export interface SessionData {
  accessToken: string;
}

export interface CustomContext extends Context {
  session?: SessionData;
}
