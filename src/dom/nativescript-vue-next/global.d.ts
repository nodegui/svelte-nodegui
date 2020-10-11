// Global compile-time constants
declare var __DEV__: boolean
declare var __TEST__: boolean

declare module 'set-value' {
  function set(target: any, path: any, value: any, options?: any): void

  export = set
}

declare module 'unset-value' {
  function unset(target: any, path: any): void

  export = unset
}