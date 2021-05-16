import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  z-index: 999;
  top: calc(50% - 32px);
  left: 50%;
  background-color: ${(p) => p.theme.colors.yellow_white};
  transform: translate(-50%, -50%);
  font-weight: 500;
  font-size: 16px;
  margin: 30px 0;
  width: 383px;
  border-radius: 8px;
  
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;

  @media (max-width: 344px) {
    width: 296px;
  }
`;

export const Row = styled.div`
  display: flex;
  line-height: 20px;
  width: 100%;
  margin: 8px 0;
`;

export const Name = styled.div`
  white-space: nowrap;
  width: inline-block;
  margin-right: 24px;
`;

export const Description = styled.div`
  width: 200px;
  overflow-y: hidden;
  max-height: 80px;
`;

export const MemberList = styled.ul`
  overflow-y: auto;
  min-height: 24px;
  max-height: 64px;
`;

export const Member = styled.li`
  display: flex;
`;

export const StudentNumber = styled.div`
  font-weight: 700;
  line-height: 16px;
  margin-right: 8px;
`;

export const StudentName = styled.div`
  line-height: 16px;
`;

export const ButtonWrapper = styled.div`
  margin: 8px auto;
  display: flex;
`;

export const StyledInput = styled.input`
  font-size: 16px;
  line-height: 16px;
  padding: 2px;
`;

export const ErrorRow = styled.div`
  display: flex;
  justify-content: center;
  line-height: 20px;
  width: 100%;
  margin: 8px 0;
`;

export const ErrorField = styled.div`
  color: ${({ theme }) => theme.colors.danger};
`;