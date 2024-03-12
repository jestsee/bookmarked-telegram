import { BotCommand } from "telegraf/types";

export const commands: BotCommand[] = [
  {
    command: "auth",
    description: "Need to be authenticated first in order to use this service",
  },
  {
    command: "profile",
    description: "Check current signed in account profile",
  },
];
