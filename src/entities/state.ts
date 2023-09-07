import { Bookmark } from "."

export enum StateEnum {
  IDLE,
  BOOKMARK,
}

type ModePayload =
  | {
      state: StateEnum.IDLE
    }
  | {
      state: StateEnum.BOOKMARK
      payload: {
        message: string
      }
    }

export class State {
  state: StateEnum
  bookmark: Bookmark

  constructor() {
    this.state = StateEnum.IDLE
    this.bookmark = new Bookmark()
  }

  mode(val: ModePayload) {
    switch (val.state) {
      case StateEnum.BOOKMARK:
        this.bookmark.reset()
        this.bookmark.extractInformation(val.payload.message)
        break

      default:
        break
    }
  }
}
