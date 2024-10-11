declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        readonly NODE_ENV?: string
        readonly RAKUTEN_APPLICATION_ID?: string
      }
    }
  }
}
