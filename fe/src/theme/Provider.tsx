import React, {FC } from 'react';
import reset from 'styled-reset';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { theme } from './theme';
const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
        ::-webkit-scrollbar {
          width: 8px;  /* 세로축 스크롤바 길이 */
          height: 16px;  /* 가로축 스크롤바 길이 */
        }
        ::-webkit-scrollbar-track {
          background-color: transparent;
        }
        ::-webkit-scrollbar-track-piece {
          background-color: transparent;
        }
        ::-webkit-scrollbar-thumb {
          border-radius: 8px;
          background-color: lightblue;
        }
    }
    body{
        background-color: #ffffff;
        font-family: Lato, system-ui, -apple-system, BlinkMacSystemFont;
    }
    html, body, div, span, applet, object, iframe,

    h1, h2, h3, h4, h5, h6, p, blockquote, pre,

    a, abbr, acronym, address, big, cite, code,

    del, dfn, em, img, ins, kbd, q, s, samp,

    small, strike, strong, sub, sup, tt, var,

    b, u, i, center,

    dl, dt, dd, ol, ul, li,

    fieldset, form, label, legend,

    table, caption, tbody, tfoot, thead, tr, th, td,

    article, aside, canvas, details, embed, 

    figure, figcaption, footer, header, hgroup, 

    menu, nav, output, ruby, section, summary,

    time, mark, audio, video {

        margin: 0;

        padding: 0;

        border: 0;

        font-size: 100%;

        font: inherit;

        vertical-align: baseline;

    }
    a, u  {
        text-decoration: none;
        color: inherit;
    }
    /* HTML5 display-role reset for older browsers */

    article, aside, details, figcaption, figure, 

    footer, header, hgroup, menu, nav, section {

        display: block;

    }

    body {
        background-color: ${theme.colors.background_black};
        line-height: 1;

    }

    ol, ul {

        list-style: none;

    }

    blockquote, q {

        quotes: none;

    }

    blockquote:before, blockquote:after,

    q:before, q:after {

        content: '';

        content: none;

    }

    table {

        border-collapse: collapse;

        border-spacing: 0;

    }

    input {
        -webkit-appearance: none;
           -moz-appearance: none;
                appearance: none;
    }
    
    /* IE10 이상에서 input box 에 추가된 지우기 버튼 제거 */
    input::-ms-clear { display: none; }
    
    /* input type number 에서 화살표 제거 */
    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
           -moz-appearance: none;
                appearance: none;
    }
    
    select {
        -webkit-appearance: none;
           -moz-appearance: none;
                appearance: none;
    }
    
    /* IE 에서 Select box 화살표 제거 */ 
    select::-ms-expand { display: none; }
`

export const HanmoaTheme:FC = ({
    children
}) => {
    return(
        <>
            <GlobalStyle/>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </>
    )
};
