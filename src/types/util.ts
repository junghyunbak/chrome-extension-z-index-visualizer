export type Pick<T, K extends keyof T> = {
  [k in K]: T[k];
};
