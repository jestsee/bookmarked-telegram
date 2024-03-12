import { NarrowedContext, Context } from "telegraf"
import { Update, Message } from "telegraf/types"
import { Regex } from "../utils/regex"

export type TweetType = "tweet" | "thread"

export class Bookmark {
  tweet?: string
  type?: TweetType
  tags: string[]

  constructor(tweet?: string, type?: TweetType, tags?: string[]) {
    this.tweet = tweet
    this.type = type
    this.tags = tags ?? []
  }

  setType(type: TweetType) {
    this.type = type
  }

  reset(tweet?: string) {
    this.tweet = tweet
    this.type = undefined
    this.tags = []
  }

  getTweetUrl(value: string) {
    const url = value.match(Regex.tweetUrl)
    if (url) {
      this.tweet = url[0]
    }
  }

  extractHashtags(value: string) {
    const keywords = value.match(Regex.hastags)

    if (!keywords) return
    keywords.forEach((keyword) => {
      const item = keyword.substring(1).toLowerCase()
      if (item === "tweet" || item === "thread") {
        this.type = item
      } else {
        this.tags.push(item)
      }
    })
  }

  extractInformation(message: string) {
    this.getTweetUrl(message)
    this.extractHashtags(message)
  }

  isPayloadCompleted() {
    const completed = this.tweet && this.type && this.tags.length > 0
    if (!completed && !this.tweet) return { completed, attribute: "tweet" }
    if (!completed && !this.type) return { completed, attribute: "type" }
    if (!completed && this.tags.length === 0)
      return { completed, attribute: "tags" }
    return { completed }
  }

  submit() {
    // TODO
  }

  // for debugging purpose
  log() {
    console.log({ tweet: this.tweet, type: this.type, tags: this.tags })
  }
}
