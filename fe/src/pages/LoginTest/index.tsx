import LoginForm from "@components/login/form";
import SkeletonHomeCard from "@components/skeleton/home";
import SkeletonCard from "@components/skeleton/card";
import InputField from "@components/form/inputField";
import React from "react";
import styled from "styled-components";

const StyledSelf = styled.section`
  max-width: 500px;
`;
const StyledArticle = styled.article`
  margin: 0 auto;
  padding: 16px;
`;
const StyledTitle = styled.h2``;
const StyledLoginForm = styled(LoginForm)`
  margin: 0 auto;
  padding: 24px;
`;

const LoginTest = ({}) => {
  const customSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };
  return (
    <section>
      <StyledArticle>
        <StyledLoginForm
          message={"Please Fill your Login form"}
          onSubmit={customSubmit}
        />
      </StyledArticle>
      <StyledArticle>
        <SkeletonCard />
        <SkeletonHomeCard />
      </StyledArticle>
      <StyledArticle>
        <InputField type="file" />
      </StyledArticle>
    </section>
  );
};

export default LoginTest;
