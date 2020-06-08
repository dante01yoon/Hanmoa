import React, { FC } from 'react';
import { CardData } from 'src/models/card';
import { Icon } from 'src/components/icon';
import * as Styled from './style';
const { 
  Container,
  ImgBox,
  ContentBox,
  CategoryBox,
  CategoryIcon,
  Category,
  MemberCount,
  TitleBox,
  Title,
  TitleIcons,
  IconBox
} = Styled; 

interface Props {
  width?: number,
  height?: number, 
  data: CardData
}

export const Card:FC<Props> = ({
  width,
  height,
  data
}) => {
  const { 
    imgUrl,
    title,
    description,
    host, 
    members,
    full, 
    current,
    category,
    url
  }  = data; 
  const extractedUrl = imgUrl ?? 'none'; 
  return(
    <>
      <Container>
        <ImgBox imgUrl={extractedUrl}/>
      </Container>
      <ContentBox>
        <CategoryBox>
          <CategoryIcon />
          <Category>{category}</Category>
          <MemberCount> {current} / {full} </MemberCount>  <MemberCount/>  
        </CategoryBox>
        <TitleBox>
          <Title>
            {title}
          </Title>
          <TitleIcons>
            <Icon shape={'share'} clickHandler={() => console.log('share')}/> 
            <Icon shape={'heart'} clickHandler={() => console.log('heart')}/>
          </TitleIcons>        
        </TitleBox>
      </ContentBox>  
    </>
  )
}