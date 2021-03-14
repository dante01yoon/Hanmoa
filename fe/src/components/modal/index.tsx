import React, { FC, useEffect, SyntheticEvent } from "react";
import { Route } from "react-router-dom";
import * as Styled from "./style";
import type { Room } from "@payload/index";
import { BaseButton } from "@components/button";
import { useModalDispatch } from "@utils/modal/useModal";
const {
  Wrapper,
  Row,
  Name,
  Description,
  Member,
  StudentNumber,
  StudentName,
  MemberList,
  ButtonWrapper,
} = Styled;

interface ModalProps extends Room{
}
export const Modal: FC<ModalProps> = ({ 
  title,
  subTitle,
  id,
  join,
  host,
  createdBy,
  topic,
 }) => {
  const enter: (e: SyntheticEvent) => void = () => {};
  const close = useModalDispatch();
  const buildMemberList = () =>
    join.map((value, index) => {
      return (
        <Member key={index}>
          <StudentNumber>{host.studentNumber}</StudentNumber>
          <StudentName>{host.name}</StudentName>
        </Member>
      );
    });
  useEffect(() => {}, []);
  return (
    <Wrapper>
      <Row>
        <Name>제목:</Name>
        <Description>{title}</Description>
      </Row>
      <Row>
        <Name>카테고리:</Name>
        <Description>{topic.category}</Description>
      </Row>
      <Row>
        <Name>인원:</Name>
        <MemberList>{buildMemberList()}</MemberList>
      </Row>
      <Row>
        <ButtonWrapper>
          <Route
            render={({ history }) => (
              <BaseButton
                background={"#28D84F"}
                clickHandler={() => {
                  close({ type: "CLOSE" });
                  history.push(`room/${id}`);
                }}
              >
                입장
              </BaseButton>
            )}
          />

          <BaseButton
            background={"#DC3943"}
            clickHandler={() => close({ type: "CLOSE" })}
          >
            닫기
          </BaseButton>
        </ButtonWrapper>
      </Row>
    </Wrapper>
  );
};
