export function isContainTweetUrl(text: string) {
  const twitterUrlPattern = /(https?:\/\/twitter\.com\/\w+\/status\/\d+)/i
  return twitterUrlPattern.test(text)
}
