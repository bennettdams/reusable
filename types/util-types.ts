export type OmitStrict<Type, Key extends keyof Type> = Type extends unknown
  ? Pick<Type, Exclude<keyof Type, Key>>
  : never;

export type Nullable<T> = { [K in keyof T]: T[K] | null };
