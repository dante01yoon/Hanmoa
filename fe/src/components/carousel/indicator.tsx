import React, { FC } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  display: inline-block; 
  height: 24px;
  position:absolute;
  bottom: 32px;
  left: 50%;
`;
const DotList = styled.ul`
  height: 100%; 
`;
const Dot = styled.li<{
  fill?: boolean
}>`
  float:left;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  ${p=> p.fill ? css` background-color: ${p.theme.colors.cyan}` : null };  
`

export const Indicator: FC<{
  max?: number,
  total: number,
  now?: number,
}> = ({
  max = 5,
  total,
  now = 1
}) =>{
  const dotMax = max < total ? max : total; 
  const dotArray= new Array();
  for(let i = 1; i <= dotMax; i++){
    if(i===now) dotArray.push(<Dot key={i} fill={true} />)
    else dotArray.push(<Dot/>)
  }
  return(
    <Container>
      <DotList>
        {dotArray}
      </DotList> 
    </Container>  
  )
}