import React, { FC } from "react";
import { Route, useHistory } from "react-router-dom";
import * as Styled from "./style";
import * as yup from "yup";
import type { Room } from "@payload/index";
import { BaseButton } from "@components/button";
import { useFormik, FormikHelpers } from "formik";
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
  ErrorRow,
  ErrorField,
} = Styled;

const validationSchema = yup.object().shape({
  password: yup.string().required("비밀번호를 입력해주세요"),
});

interface GrantValues {
  password: string;
  validate: string;
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
  const { http, roomStore } = useMobxStores();
  const close = useModalDispatch();
  const history = useHistory();

  const handleSubmitPassword = async (values: GrantValues, formikHelpers: FormikHelpers<GrantValues>) => {
    roomStore.fetchAuthenticate(id, {
      id,
      callbackError: () => {
        formikHelpers.setFieldError("validate", "유효하지 않은 비밀번호입니다")
      },
      callbackSuccess: () => {
        close({ type: "CLOSE" });
        history.push(`/room/${id}`);
      },
      ...values,
    })
  }

  const formik = useFormik<GrantValues>({
    validationSchema,
    initialValues: {
      password: "",
      validate: "",
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
        {formik.errors && (
          <ErrorRow>
            <ErrorField>{formik.errors.password || formik.errors.validate}</ErrorField>
          </ErrorRow>
        )}
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
      { !hasPassword || roomStore.authenticate[id]
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
