export function isContainTweetUrl(text: string) {
  const twitterUrlPattern = /(https?:\/\/twitter\.com\/\w+\/status\/\d+)/i
  return twitterUrlPattern.test(text)
}

export function checkTypeAndTag(text: string, action: () => void) {
  // check if it is containing #thread or #tweet
  if (text.includes("#thread") || text.includes("#tweet")) {
    // TODO adding tag
    // TODO process
  } else {
    // showing options
    // TODO adding tag
    // TODO process
  }
}
