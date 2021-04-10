import React, { FC, useState, useEffect, SyntheticEvent } from "react";
import { ICardData } from "src/models/card";
import { Icon } from "src/components/icon";
import { observer } from "mobx-react";
import { GetRoomPayload } from "@payload/index";
import category_tv from "src/asset/monitor-tv.svg";
import share from "src/asset/share.svg";
import heart from "src/asset/heart_not_checked.svg";
import heart_filled from "src/asset/heart_checked.svg";
import batman from "src/asset/batman.jpg"
import * as Styled from "./style";

const {
  Container,
  ImgBox,
  ContentBox,
  CategoryBox,
  CategoryIcon,
  Category,
  GradientBox,
  MemberCount,
  TitleBox,
  Title,
  TitleIcons,
  IconBox,
} = Styled;

interface CardProps {
  width?: number;
  height?: number;
  room: GetRoomPayload["room"];
  handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Card: FC<CardProps> = ({ width, height, room, handleClick }) => {
  const [like, setLike] = useState<boolean>(false);
  const {
    imageUrl,
    title,
    subTitle,
    gradient,
    host,
    topic,
    join,
  } = room!;
  const extractedUrl = imageUrl || batman;

  const handleHeartClick = (e: React.BaseSyntheticEvent<MouseEvent>): void => {
    if (checkHeartClick()) {
      setLike(!like);
    }
  };
  const renderCurrentMemberStatus = () => {

  }
  const checkHeartClick = (): boolean => {
    return true;
  };

  return (
    <Container>
      <GradientBox
        gradient={gradient}
        onClick={handleClick}
      >
        <ImgBox imgUrl={extractedUrl} onClick={handleClick} />
      </GradientBox>
      <ContentBox>
        <CategoryBox>
          <IconBox src={category_tv} />
          <Category>{topic.category}</Category>
          <MemberCount block={false}>
          </MemberCount>
        </CategoryBox>
        <TitleBox>
          <Title>{title}</Title>
          <TitleIcons>
            <IconBox src={share} />
            <IconBox
              onClick={handleHeartClick}
              src={like ? heart_filled : heart}
            />
          </TitleIcons>
        </TitleBox>
      </ContentBox>
    </Container>
  );
};

export default observer(Card);