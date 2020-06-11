import React, { FC, useState, useEffect, SyntheticEvent } from 'react';
import { CardData } from 'src/models/card';
import { Icon } from 'src/components/icon';
import CategoryImage from 'src/asset/monitor-tv.svg';
import ShareImage from 'src/asset/share.svg';
import HeartImage from 'src/asset/heart_not_checked.svg';
import HeartFilledImage from 'src/asset/heart_checked.svg';
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
  handleClick: (e:SyntheticEvent) => void 
}

export const Card:FC<Props> = ({
  width,
  height,
  data,
  handleClick
}) => {
  const [like, setLike] = useState<boolean>(false);
  
  const { 
    imgUrl,
    title,
    description,
    host, 
    members,
    full, 
    current,
    category,
    url,
    block
  }  = data; 
  const extractedUrl = imgUrl ?? 'none'; 
  return(
      <Container >
        <ImgBox imgUrl={extractedUrl} onClick={handleClick}/>
        <ContentBox>
          <CategoryBox>
            <IconBox> 
              <CategoryImage />
            </IconBox>
            <Category>{category}</Category>
            <MemberCount block={block}> 
              {current} 
                / 
              {full} 
            </MemberCount> 
          </CategoryBox>
          <TitleBox>
            <Title>
              {title}
            </Title>
            <TitleIcons>
              <IconBox>
                <ShareImage/>
              </IconBox>
              <IconBox>
                {
                  like ? 
                  <HeartFilledImage /> : 
                  <HeartImage />  
                }
              </IconBox>
              {/* <Icon shape={'share'} scale={1.5} clickHandler={() => console.log('share')}/>  */}
              {/* <Icon shape={'heart'} clickHandler={() => console.log('heart')}/> */}
            </TitleIcons>        
          </TitleBox>
        </ContentBox> 
      </Container>
  )
}