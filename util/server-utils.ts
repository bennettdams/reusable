export function isServer(): boolean {
    return typeof window === "undefined";
  }
  
  export function isBuild(): boolean {
    return process.env.IS_BUILD === "true";
  }
  