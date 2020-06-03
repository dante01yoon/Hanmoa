import React, { SFC } from 'react';
import styled from 'styled-components';

const IMG = styled.img`
  width: 100%;
  height: 70vh;
`;

export const Slide: SFC<{
  src?: string,
  alt?: string
}> =({
  src,
  alt
}) => {
  return(
    <IMG src={src} alt={alt}/>
  )
}

