import LoginForm from "@components/login/form";
import SkeletonHomeCard from "@components/skeleton/home";
import SkeletonCard from "@components/skeleton/card";
import React from "react";
import styled from "styled-components";

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
      <StyledLoginForm
        message={"Please Fill your Login form"}
        onSubmit={customSubmit}
      />
      <SkeletonCard />
      <SkeletonHomeCard/>
    </section>
  );
};

export default LoginTest;
