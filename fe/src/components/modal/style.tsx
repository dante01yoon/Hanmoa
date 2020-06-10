import styled from 'styled-components';

export const Wrapper = styled.div`
  position:fixed;
  top: 30%;
  left:50%;
  transform:translateX(-50%) translateY(-30%);
  display: flex;
  flex-direction: column;
  border-radius: 8px; 
  padding: 32px;
  font-weight: 500;
  font-size: 16px;
  background-color: ${p=>  p.theme.colors.yellow_white};
  width: 383px;
  @media (max-width: 344px ){
    width: 296px;
  }
`; 

export const Row = styled.div`
  display: flex; 
  // width: 240px;
  width:100%;
  margin: 8px 0;
`
export const Name = styled.div`
  white-space: nowrap;
  width: inline-block;
  margin-right: 24px;
`

export const Description = styled.div`
  width: 200px;
  overflow-y: hidden;
  max-height: 80px;
`

export const MemberList = styled.ul`
  overflow-y: auto;
  min-height: 24px;
  max-height: 64px;
`
export const Member = styled.li`
  display: flex;

`
export const StudentNumber = styled.div`
  font-weight: 700;
  line-height: 16px;
  margin-right: 8px;
`
export const StudentName = styled.div`
  line-height: 16px;
` 
export const ButtonWrapper = styled.div`
  margin: 8px auto;
  display: flex;
`