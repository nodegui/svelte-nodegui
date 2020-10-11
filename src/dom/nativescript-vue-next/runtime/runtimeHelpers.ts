declare var __DEV__: boolean
declare var __TEST__: boolean
export const ELEMENT_REF = Symbol(__DEV__ ? `elementRef` : ``)

export const isAndroidKey = (key: string) =>
  key[0] === 'a' &&
  key[1] === 'n' &&
  key[2] === 'd' &&
  key[3] === 'r' &&
  key[4] === 'o' &&
  key[5] === 'i' &&
  key[6] === 'd' &&
  key[7] === ':'

export const isIOSKey = (key: string) =>
  key[0] === 'i' && key[1] === 'o' && key[2] === 's' && key[3] === ':'

export const isBoolean = (value: unknown): boolean => {
  return typeof value === 'boolean' || value instanceof Boolean
}