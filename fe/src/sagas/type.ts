import { ActionCreatorsMapObject } from "redux";

export type TApiEndpoint<P extends any[], D> = (...p: P) => Promise<D>;

export interface IEntity<R, S, F> {
  REQUEST: R;
  SUCCESS: S;
  FAILURE: F;
}
export interface IActionOfEntity<T> extends ActionCreatorsMapObject<T> {
  [key: string]: (...arg: any[]) => T;
}
export interface IEntityAction<T> {
  ACTION: IActionOfEntity<T>;
  API: TApiEndpoint<any, any>;
}

export type TEntityAction<T extends IEntityAction<any>> = ReturnType<
  T["ACTION"][keyof T["ACTION"]]
>;
