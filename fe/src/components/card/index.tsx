import React, { FC, useState, useEffect, SyntheticEvent } from 'react';
import { CardData } from 'src/models/card';
import { Icon } from 'src/components/icon';
import category_tv from 'src/asset/monitor-tv.svg';
import share from 'src/asset/share.svg';
import heart from 'src/asset/heart_not_checked.svg';
import heart_filled from 'src/asset/heart_checked.svg';
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

  const handleHeartClick = (e: React.BaseSyntheticEvent<MouseEvent>): void => {
    if( checkHeartClick()){
      setLike(!like);
    }
  }

  const checkHeartClick = (): boolean => {

    return true;
  }

  return(
      <Container >
        <ImgBox imgUrl={extractedUrl} onClick={handleClick}/>
        <ContentBox>
          <CategoryBox>
            <IconBox src={category_tv} />
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
              <IconBox  src={share}/>
              <IconBox
                  onClick={handleHeartClick}
                  src={like? heart_filled : heart}
              />
            </TitleIcons>
          </TitleBox>
        </ContentBox> 
      </Container>
  )
}