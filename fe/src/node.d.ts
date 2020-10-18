
declare namespace NodeJS {
  interface Process {
    /** running on server */
    isServer: boolean;
  }

  interface ProcessEnv{
    /** node environment */
    [key: string]: string | undefined;
  }
}