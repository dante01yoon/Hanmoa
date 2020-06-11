import styled from 'styled-components';
export const RoomContainer = styled.ul`
  min-height: 70vh;
  margin: 40px auto;
  @media (min-width: 344px ) and (max-width: 688px){
    width: 344px;
  }
  @media (min-width: 688px) and (max-width:1032px){
    width: 688px;
  }
  @media( min-width: 1032px){
    width: 1032px;
  }
` 