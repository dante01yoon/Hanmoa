import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  top: calc(50% - 32px);
  left: 50%;
  z-index: 999;
  transform: translate(-50%, -50%);
  background-color: ${(p) => p.theme.colors.yellow_white};
  font-size: 16px;
  font-weight: 500;
  width: 383px;
  border-radius: 8px;
  margin: 30px 0;
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;

  @media (max-width: 344px) {
    width: 296px;
  }
  @media (max-width: 312px) {
    width: 264px;
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
  max-height: 80px;
  overflow-y: hidden;
`;

export const MemberList = styled.ul`
  min-height: 24px;
  max-height: 64px;
  overflow-y: auto;
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