import { 
    Typo,
    Colors,
    Media,
} from './index'; 
export interface Theme<
    TypoType = Typo,
    ColorType = Colors,
    MediaType = Media,
>{
    typography : Readonly<TypoType & Typo>,
    colors: Readonly<ColorType & Colors>,
    media: Readonly<MediaType & Media>,    
}; 