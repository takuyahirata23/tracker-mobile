export const validateLength = (x: string, length = 0) =>
  x.trim().length > length
export const isEmail = (x: string) => x.includes('@')
