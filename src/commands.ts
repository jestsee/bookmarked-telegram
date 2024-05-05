import { BotCommand } from 'telegraf/types';

export const commands: BotCommand[] = [
  {
    command: 'auth',
    description: 'for authentication'
  },
  {
    command: 'connect',
    description: 'connect your account to your Notion'
  }
];
