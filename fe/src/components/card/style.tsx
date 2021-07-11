import styled, { css } from 'styled-components';

export const Container = styled.li<{
  width?: number,
  height?: number
}>`
  display: inline-block;
  width: ${p => p.width ? `${p.width}` : 296}px;
  height: ${p => p.height ? `${p.height}` : 280}px;
  margin: 16px 8px;

  :hover {
    box-shadow: 0 0 24px 0 #999;
  }

  @media (max-width: 312px) {
    width: 264px;
  }  
`;

export const GradientBox = styled.div<{
  gradient: string;
  isJoinPossible: boolean;
}>`
  position: relative;
  background: ${({ isJoinPossible, gradient }) => isJoinPossible ? gradient : "#d4d9d5"};
  width: 100%;
  height: 168px;
  border-radius: 8px 8px 0 0;
  cursor: ${({ isJoinPossible }) => isJoinPossible ? "pointer" : "none"};
`

export const ImgBox = styled.div<{
  imgUrl?: string;
  isJoinPossible: boolean;
}>`
  position: absolute;
  right: 32px;
  bottom: -36px;
  background: url(${p => p.imgUrl}) no-repeat center;
  background-size: cover;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  cursor: ${({ isJoinPossible }) => isJoinPossible ? "pointer" : "none"};
`;

export const ContentBox = styled.div`
  background-color: ${p => p.theme.colors.card};
  width: 100%;
  height:120px;
  padding: 16px;
  border-radius: 0 0 8px 8px;
  margin: 0 auto;
`

export const CategoryBox = styled.div`
  display:flex; 
  width: 248px;
  height: 24px;
`;

export const CategoryIcon = styled.div<{
}>`
  background: url() no-repeat center;
  background-size: cover; 
  width: 24px;
  height: 100%;
`

export const Category = styled.div`
  display: -webkit-box;
  color: ${({ theme }) => theme.colors.gray_white};
  font-size: 18px;
  font-weight: 700;
  line-height:24px;
  width: 152px;
  margin-right: 40px;
  -webkit-line-clamp: 1;
  
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const MemberCount = styled.div<{
  block?: boolean
}>`
  ${p => p.block && css`color: ${p.theme.colors.gray_400}`};
  float:right;
  line-height: 24px;
  text-align:right;
  width: 96px; 
  margin-right: 8px;
`

export const TitleBox = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.gray_white};
  width: 248px;
  height: 40px;
  margin-top: 16px;
`

export const Title = styled.div`
  display: block; /* Fallback for non-webkit */ 
  display: -webkit-box;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.gray_white};
  line-height: 20px; /* Fallback for non-webkit ugly :( any idea?  */   
  width: 152px;
  height: 40px; /* Fallback for non-webkit */
  margin: 0 24px;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

export const TitleIcons = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
  width: 64px;
  height: 100%;
`

export const IconBox = styled.div<{
  src: string
}>`
  line-height: 33px;  /* ugly :( any idea? */
  margin-right: 8px;
  cursor: pointer;
  &::after {
    content: ""; 
    display: block;
    background: url("${p => p.src}") center;
    width: 24px;
    height: 24px; 
    transition: all 0.2s;
  }
`
