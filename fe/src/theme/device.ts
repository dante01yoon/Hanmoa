import { css } from "styled-components";
import { 
  IMediaDevice,
  ICustomObject,
  TInterPolation,
  TBreakPointEntry,
} from "./interface/device"

const breakPoints: IMediaDevice = {
  mb: 480,
  tb: 768,
  lb: 991,
  dt: 992
}

const emptyFunction = () => '' 
const initAcc : TInterPolation<IMediaDevice> = {
  mb: emptyFunction,
  tb: emptyFunction,
  lb: emptyFunction,
  dt: emptyFunction 
}

const object: ICustomObject = Object; 

const media = object.entries(breakPoints).reduce<TInterPolation<IMediaDevice>>(
  (acc, current: TBreakPointEntry) => {
    const [key, value ] = current; 
    acc[key] = (first, ...interpolations) => 
      css`
        @media(max-width: ${value}px){
          ${css(first, ...interpolations)}
        }
      `
    return acc;       
}, initAcc); 

export default media; 