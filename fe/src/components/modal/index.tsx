import React, { 
  FC, 
  useState , 
  useEffect, 
  SyntheticEvent 
} from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as Styled from './style';
import { CardData } from 'src/models/card';
import { BaseButton } from '@components/button';
import { useModalDispatch } from '@utils/modal/useModal';
const { 
  Wrapper,
  Row,
  Name,
  Description,
  Member,
  StudentNumber, 
  StudentName,
  MemberList,
  ButtonWrapper
} = Styled;

interface Props{
  data: CardData
}
export const Modal:FC<Props> = ({
  data
}) => {
  const { 
    title, host, members, full, current ,category, url , block 
  } = data; 
  const enter: (e: SyntheticEvent) => void = () => {
    
  }
  const close = useModalDispatch(); 
  const buildMemberList = () => (
    members.map((value, index) => {
      return (
        <Member key={index}>
          <StudentNumber>{value.studentNumber}</StudentNumber>
          <StudentName>{value.name}</StudentName>
        </Member>
      )      
    })
  )
  useEffect(() => {
    
  },[])
  return(
    <Wrapper>
      <Row>
        <Name>제목:</Name>
        <Description>{title}</Description>
      </Row>
      <Row>
        <Name>카테고리:</Name>
        <Description>{category}</Description>
      </Row>
      <Row>
        <Name>인원:</Name>
        <MemberList>
          {buildMemberList()}
        </MemberList>
      </Row>
      <Row>
        <ButtonWrapper>
          <Route render={({history}) => (
            <BaseButton
            background={'#28D84F'} 
            clickHandler={() => {
              close({type: 'CLOSE'}); 
              history.push(`room/${url}`);
            }}
            >
              입장
            </BaseButton>
          )} /> 
          
          <BaseButton 
            background={'#DC3943'}
            clickHandler={() => close({type: 'CLOSE'})}
          >
            닫기
          </BaseButton>
        </ButtonWrapper>
      </Row>
    </Wrapper>
  )
}