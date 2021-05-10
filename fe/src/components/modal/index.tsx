import React, { FC, useEffect, SyntheticEvent } from "react";
import { Route } from "react-router-dom";
import * as Styled from "./style";
import * as yup from "yup";
import type { Room } from "@payload/index";
import { BaseButton } from "@components/button";
import { useFormik } from "formik";
import { useModalDispatch } from "@utils/modal/useModal";
import { useMobxStores } from "@utils/store/useStores";

const {
  Wrapper,
  StyledContainer,
  Row,
  Name,
  Description,
  Member,
  StudentNumber,
  StudentName,
  MemberList,
  ButtonWrapper,
  StyledInput,
} = Styled;

const validationSchema = yup.object().shape({
  password: yup.string().required("required"),
});

interface GrantValues {
  password: string;
}

interface ModalProps extends Room {
}

export const Modal: FC<ModalProps> = ({
  title,
  subTitle,
  id,
  join,
  host,
  createdBy,
  current,
  topic,
  capability,
  hasPassword,
}) => {
  const { http } = useMobxStores();
  const close = useModalDispatch();

  const handleSubmitPassword = () => {

  }

  const formik = useFormik<GrantValues>({
    validationSchema,
    initialValues: {
      password: "",
    },
    onSubmit: handleSubmitPassword,
  })

  const renderBuildFormik = () => {
    return (
      <form onSubmit={formik.handleSubmit}>
        <Row>
          <ButtonWrapper>
            <Name>비밀번호:</Name>
            <Description>
              <StyledInput
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </Description>
          </ButtonWrapper>
        </Row>
        <Row>
          <ButtonWrapper>
            <BaseButton
              type="submit"
              background={"#28D84F"}
            >
              입장
          </BaseButton>
            <BaseButton
              type="button"
              background={"#DC3943"}
              clickHandler={() => close({ type: "CLOSE" })}
            >
              닫기
            </BaseButton>
          </ButtonWrapper>
        </Row>
      </form>
    )
  }

  const buildMemberList = () =>
    join.map((value, index) => {
      return (
        <Member key={`$${index}value.profile.id`}>
          <StudentNumber>{value.profile.studentNumber}</StudentNumber>
          <StudentName>{value.profile.name}</StudentName>
        </Member>
      );
    });

  return (
    <Wrapper>
      { !hasPassword
        ? (
          <StyledContainer>
            <Row>
              <Name>제목:</Name>
              <Description>{title}</Description>
            </Row>
            <Row>
              <Name>카테고리:</Name>
              <Description>{topic.category}</Description>
            </Row>
            <Row>
              <Name>인원:&nbsp;{current}/{capability}</Name>
              <MemberList>{buildMemberList()}</MemberList>
            </Row>
            <Row>
              <ButtonWrapper>
                <Route
                  render={({ history }) => (
                    <BaseButton
                      background={"#28D84F"}
                      clickHandler={() => {
                        close({ type: "CLOSE" });
                        history.push(`/room/${id}`);
                      }}
                    >
                      입장
                    </BaseButton>
                  )}
                />

                <BaseButton
                  background={"#DC3943"}
                  clickHandler={() => close({ type: "CLOSE" })}
                >
                  닫기
            </BaseButton>
              </ButtonWrapper>
            </Row>
          </StyledContainer>
        )
        : (
          <StyledContainer>
            {renderBuildFormik()}
          </StyledContainer>
        )
      }

    </Wrapper>
  );
};
