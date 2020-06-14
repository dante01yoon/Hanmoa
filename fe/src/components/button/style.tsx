import styled from 'styled-components';

export const Wrapper = styled.div`

`

export const Button = styled.button<{
  color: string,
  size?: number,
  background: string,
}>`
${p=> p.size ? `width: ${p.size}px` :''}; 
margin: 0 8px;
padding: 8px 24px;
border: 0;
border-radius: 25px;
background-color: ${p=> p.background};
color: ${p => p.color}; 
&:focus, &:hover{
  outline: 0;
  box-shadow: 0 0 24px 0 #bbb;
}
  
  cursor:pointer;
`; 