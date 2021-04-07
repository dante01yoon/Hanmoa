import styled from 'styled-components';

export const RoomWrapper = styled.div`
  width: 100%;
  padding-top: 40px;

  
`;

export const StyledRoomContainer = styled.ul`
  min-height: 70vh;
  margin: 0 auto;

  @media (min-width: 344px){
    width: 312px;
  }
  @media (min-width: 624px){
    width: calc(312px*2);
  }
  @media( min-width: 950px){
    width: calc(312px*3);
  }
  @media( min-width: 1280px){
    width: calc(312px*4);
  }
`