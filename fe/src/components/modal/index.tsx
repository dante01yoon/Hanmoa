import React, { 
  FC, 
  useState , 
  useEffect, 
  SyntheticEvent 
} from 'react';
import { Link } from 'react-router-dom';
import * as Styled from './style';
import { CardData } from 'src/models/card';

const { 
  Wrapper,
  Row,
  Name,
  Description,
  Member,
  StudentNumber, 
  StudentName,
  MemberList
} = Styled;

interface Props{
  data: CardData
}
export const Modal:FC<Props> = ({
  data
}) => {
  const [ visible, setVisible ] = useState<boolean>();
  const { 
    title, host, members, full, current ,category, url , block 
  } = data; 
  const enter: (e: SyntheticEvent) => void = () => {
    
  }
  const buildMemberList = () => (
    members.map((value, index) => {
      return (
        <Member key={index}>
          <Name>{value.number}</Name>
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
    </Wrapper>
  )
}