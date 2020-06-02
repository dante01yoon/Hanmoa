import { 
    Typo,
    Colors
} from './index'; 
export interface Theme<
    TypoType = Typo,
    ColorType = Colors
>{
    typography : Readonly<TypoType & Typo>,
    colors: Readonly<ColorType & Colors>    
}; 