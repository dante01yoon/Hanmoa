import styled from 'styled-components';

export const Wrapper = styled.div`
  position:relative;
  display: flex;
  flex-direction: column;
  border-radius: 8px; 
  padding: 16px;
  font-weight: 500;
  font-size: 16px;
`; 

export const Row = styled.div`
  display: flex; 
  width: 240px;
`
export const Name = styled.div`
  width: inline-block;
  margin-right: 24px;
`

export const Description = styled.div`
  width: 200px;
  overflow-y: hidden;
`

export const MemberList = styled.ul`
  overflow-y: auto;
  height: 80px;
`
export const Member = styled.li`
  display: flex;

`
export const StudentNumber = styled.div`
  font-weight: 700;
  line-height: 16px;

`
export const StudentName = styled.div`
  line-height: 16px;

` 