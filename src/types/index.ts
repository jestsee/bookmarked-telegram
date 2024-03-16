import { Context } from 'telegraf';

export interface SessionData {
  token: string;
}

export interface CustomContext extends Context {
  session?: SessionData;
}
