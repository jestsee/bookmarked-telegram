import { Context, Scenes } from 'telegraf';

export type BookmarkType = 'tweet' | 'thread';

export interface BookmarkPayload {
  url?: string;
  type?: BookmarkType;
}

export interface BookmarkWizardSession extends Scenes.WizardSessionData {
  bookmarkPayload: BookmarkPayload;
}

export interface CustomSession
  extends Scenes.WizardSession<BookmarkWizardSession> {
  accessToken: string;
}

export interface CustomContext extends Context {
  session?: CustomSession;
  scene: Scenes.SceneContextScene<CustomContext, BookmarkWizardSession>;
  wizard: Scenes.WizardContextWizard<CustomContext>;
}
