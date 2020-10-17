import { 
    Typo,
    Colors,
    Media,
    Functions,
} from './index'; 
export interface Theme<
    TypoType = Typo,
    ColorType = Colors,
    MediaType = Media,
    FunctionsType = Functions, 
>{
    typography : Readonly<TypoType & Typo>,
    colors: Readonly<ColorType & Colors>,
    media: Readonly<MediaType & Media>,    
    functions: Readonly<FunctionsType & Functions>,
}; 