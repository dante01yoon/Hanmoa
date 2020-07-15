import { 
  CSSObject,
  SimpleInterpolation,
  FlattenSimpleInterpolation, 
} from 'styled-components';

export interface IMediaDevice {
  mb: number
  tb: number
  lb: number
  dt: number
}

export type TBreakPointEntry = [keyof IMediaDevice, IMediaDevice[keyof IMediaDevice]]

export type TInterPolation<T> = {
  [key in keyof T]: 
    | ((
      first: CSSObject | TemplateStringsArray,
      ...interpolations : SimpleInterpolation[]
      ) => FlattenSimpleInterpolation)
    | (() => string)
}

export interface ICustomObject extends ObjectConstructor {
  entries<K extends keyof IMediaDevice, T>(o: { [s in K]: T} | ArrayLike<T>): [K,T][]
}

export interface Media extends TInterPolation<IMediaDevice>{}