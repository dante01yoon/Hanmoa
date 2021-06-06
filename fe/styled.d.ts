import { Theme } from "src/theme/interface/theme";
import { CSSProp, CSSObject } from "styled-components";


declare module "styled-components" {
  export interface DefaultTheme extends Theme { }
}

declare module "react" {
  interface Attributes {
    css?: CSSProp | CSSObject;
  }
}