import React, { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { withRouter } from "react-router";
import styled from "styled-components";
import { useMobxStores } from "@utils/store/useStores";

interface CreateRoomPageProps {
  
}

const StyledSelf = styled.main`
`;

const StyledSection = styled.section`
  margin: 0 auto;
`;

const StyledArticle = styled.article`
  padding-top: 20px;
`;

const CreateRoomPage: React.ComponentClass<any, FC<CreateRoomPageProps>> = withRouter(({
  
}) => {
  return (
    <StyledSelf>
      <StyledSection>
        <StyledArticle>
          
        </StyledArticle>
        <StyledArticle>
          
        </StyledArticle>
      </StyledSection>
    </StyledSelf>
  )
});

export default observer(CreateRoomPage);