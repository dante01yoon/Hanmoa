import styled from 'styled-components';

export const Container = styled.div<{
  width?: number,
  height?: number 
}>`
  width: ${p => p.width ? `${p.width}` : 296}px;
  height: ${p => p.height ? `${p.height}` : 280}px;
`;

export const ImgBox = styled.div<{
  imgUrl?: string 
}>`
  width: 100%;
  height: 58%;
  background: url(${p => p.imgUrl}) no-repeat center;
  background-size: cover;
`
export const ContentBox = styled.div`
  width: 100%;
  height: 42%; 
  margin: 0 auto;
`
export const CategoryBox = styled.div`
  width: 248px;
  height: 24px;
  display:flex; 
`;
export const CategoryIcon = styled.div`
  width: 24px;
  height: 100%;
` 
export const Category = styled.div`
  width: 192px;
  height: 100%:
  line-clamps: 1; 
`
export const MemberCount = styled.div`
  width: 32px; 
  height: 100%;
`
export const TitleBox = styled.div`
  width: 248px;
  height: 48px;
  display: flex;
`
export const Title = styled.div`
  width: 152px;
  height: 100%;
  line-clamps: 2;
`
export const TitleIcons = styled.div`
  width: 64px;
  height: 100%;
  display: flex;
  justify-content: center; 
  align-items: center;
`
export const IconBox = styled.div<{
  url: string
}>`
  width: 24px;
  height: 24px;
  background: url(${p => p.url}) no-repeat center;
  background-size: cover; 
  cursor: pointer;
`
