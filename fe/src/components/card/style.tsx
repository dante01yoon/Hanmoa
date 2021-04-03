import styled, { css } from 'styled-components';

export const Container = styled.li<{
  width?: number,
  height?: number 
}>`
  width: ${p => p.width ? `${p.width}` : 296}px;
  height: ${p => p.height ? `${p.height}` : 280}px;
  margin: 16px 8px;
  display: inline-block;
  :hover {
    box-shadow: 0 0 24px 0 #bbb;
  }

`;

export const ImgBox = styled.div<{
  imgUrl?: string 
}>`
  cursor: pointer;
  width: 100%;
  height: 168px;
  background: url(${p => p.imgUrl}) no-repeat center;
  background-size: cover;
  border-radius: 8px 8px 0 0;
`
export const ContentBox = styled.div`
  width: 100%;
  height:120px;
  margin: 0 auto;
  padding: 16px;
  background-color: ${p => p.theme.colors.yellow_white};
  border-radius: 0 0 8px 8px;

`
export const CategoryBox = styled.div`
  width: 248px;
  height: 24px;
  display:flex; 
`;
export const CategoryIcon = styled.div<{
}>`
  width: 24px;
  height: 100%;
  background: url() no-repeat center;
  background-size: cover; 
` 
export const Category = styled.div`
  line-height:24px;
  font-size: 18px;
  font-weight: 700;
  width: 152px;
  margin-right: 40px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`
export const MemberCount = styled.div<{
  block?: boolean
}>`
  ${p=> p.block && css`color: ${p.theme.colors.gray_400}`};
  text-align:right;
  float:right;
  width: 96px; 
  margin-right: 8px;
  line-height: 24px;
`
export const TitleBox = styled.div`
  margin-top: 16px;
  width: 248px;
  height: 40px;
  display: flex;
`
export const Title = styled.div`
  display: block; /* Fallback for non-webkit */ 
  display: -webkit-box;
  width: 152px;
  margin: 0 24px;
  -webkit-line-clamp: 2;
  height: 40px; /* Fallback for non-webkit */
  -webkit-box-orient: vertical;
  line-height: 20px; /* Fallback for non-webkit ugly :( any idea?  */   
  overflow: hidden;
  text-overflow: ellipsis;
`
export const TitleIcons = styled.div`
  width: 64px;
  height: 100%;
  display: flex;
  justify-content: center; 
  align-items: center;
`
export const IconBox = styled.div<{
  src: string
}>`
  margin-right: 8px;
  line-height: 33px;  /* ugly :( any idea? */
  cursor: pointer;
  &::after {
    display: block;
    content: ""; 
    width: 24px;
    height: 24px; 
    background: url("${p => p.src}") center;
    transition: all 0.2s;
  }
`
