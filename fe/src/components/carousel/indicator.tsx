import React, { FC, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  display: inline-block; 
  border: 0;
  height: 24px;
  position:absolute;
  bottom: 32px;
  right: 40px;
`;
const DotList = styled.ul`
  height: 100%; 
`;
const Dot = styled.li<{
  fill?: boolean
}>`
  float:left;
  width: 24px;
  height: 8px;
  margin: 4px;
  border-radius: 16px;
  background-color: ${p=> p.fill ? `${p.theme.colors.gray_700}` : `${p.theme.colors.gray_200}` };  
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
    if( i=== now ) dotArray.push(<Dot key={i} fill={true} />)
    else dotArray.push(<Dot key={i} />)
  }
  return(
    <Container>
      <DotList>
        {dotArray}
      </DotList> 
    </Container>  
  )
}