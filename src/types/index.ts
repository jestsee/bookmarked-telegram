import { Context, Scenes } from 'telegraf';

export type BookmarkType = 'tweet' | 'thread';

export interface BookmarkPayload {
  url?: string;
  type?: BookmarkType;
  tags?: string[];
  messageId: number;
}

export interface BookmarkWizardSession extends Scenes.WizardSessionData {
  bookmarkPayload: BookmarkPayload;
}

export interface CustomSession
  extends Scenes.WizardSession<BookmarkWizardSession> {
  accessToken?: string;
}

export interface CustomContext extends Context {
  session?: CustomSession;
  scene: Scenes.SceneContextScene<CustomContext, BookmarkWizardSession>;
  wizard: Scenes.WizardContextWizard<CustomContext>;
}

export interface AdditionalData {
  messageId: number;
  chatId: number;
}

export type BookmarkResponse =
  | {
      type: 'success';
      author: string;
      notionPageUrl: string;
      text: string;
      tweetUrl: string;
      username: string;
      additionalData: AdditionalData;
    }
  | {
      type: 'error';
      error: string;
      additionalData: AdditionalData;
    };
