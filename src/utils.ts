export const isValidUUID = (value: string) => {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(value);
};

export const getTweetUrl = (value: string) => {
  const regexExp = /(twitter\.com\/[^\s]+)/;
  const matches = value.match(regexExp);
  return matches ? matches[0] : null;
};
