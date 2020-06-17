import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color:${p => p.theme.colors.white}; 
  position:fixed;
  top: 50%;
  left: 50%;
  transform:translateX(-50%) translateY(-50%);
  width: 320px;
  height: 288px;
  border-radius: 8px;
  padding: 16px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  `;

export const IconWrapper = styled.div`
    
`; 
export const ButtonContainer = styled.div`

`;