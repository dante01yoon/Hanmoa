import React, { SFC } from 'react';
import styled from 'styled-components';

const Img = styled.div<{
  url: string 
}>`
  width: 100%;
  height: 60vh;
  max-height: 400px;
  background: url(${p=>p.url}) no-repeat center;
  background-size: cover;
`;

interface Props {
  url: string
}
export const Slide: SFC<Props> = ({
  url,
}) => {
  return(
    <Img url={url} />
  )
}

