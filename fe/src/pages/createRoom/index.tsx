import React, { FC, useReducer, useEffect, useCallback, useRef, useState } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { useMobxStores, useToast } from "@utils/store/useStores";
import { GetRoomPayload, Profile, Topic } from "src/payload";
import { Formik, FormikConfig } from "formik";
import * as yup from "yup";
import Field from "@components/form/field";
import Loading from "@components/loading";
import CreationCarousel from "@components/carousel/creationCarousel";
import { useModal } from "src/utils/modal/useModal";
import { Modal } from "src/components/modal";
import RoomStore from "src/store/RoomStore";
import { DefaultToast } from "src/components/toast";

interface CreateRoomPageProps {

}

const StyledSelf = styled.main`
`;

const StyledSection = styled.section`
  max-width: 1085px;
  margin: 0 auto;
`;

const StyledArticle = styled.article`
  padding-top: 74px;
  padding-left: 36px;
  margin: 0 auto;

`;

const StyledTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray_white};
`;

const StyledFormWrapper = styled.div`
  display: flex;
  max-width: fit-content;
  margin: 38px auto;
  
`;

const TopicSelectorContainer = styled.div`
  height: 100%;
`;

const TopicSelectorList = styled.ul`
  display: flex;
  border: 1px solid #E5E5E5;
`;

const TopicSelector = styled.li<{
  rightBorder: boolean;
  isSelected?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, isSelected }) => isSelected
    ? theme.colors.background_black
    : theme.colors.gray_white};
  background-color: ${({ theme, isSelected }) => isSelected ? theme.colors.gray_white : "transparent"};
  font-size: 15px;
  width: 70px;
  height: 40px;
  border-right: ${({ rightBorder, theme }) => rightBorder ? `1px solid ${theme.colors.gray_white}` : 0};
  cursor: pointer;

  &: hover{
    color: ${({ theme }) => theme.colors.background_black};
    background-color: #E5E5E5;
}
`

const ImageFormContainer = styled.div`
  position: relative;
  height: 100%;
  margin: 0 72px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 296px;
  height: 162px;
`;

const ImagePreview = styled.div<{
  imageUrl: string;
}>`
  background: url(${({ imageUrl }) => imageUrl})  no-repeat center / 100%;
  width: 296px;
  height: 168px;
`;

const ImageFormSelector = styled.label`
  position: absolute;
  left: 50%;
  bottom: 14px;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.blue};
  line-height: 31px;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  width: 74px;
  height: 31px;
  transform: translate(-50%, -50%);
  border-radius: 25px;
  cursor: pointer;

  &:hover{
    background-color: ${({ theme }) => theme.colors.background_blue}
  }
`

const HiddenImageInput = styled.input`
  display: none;
`;

const FormContainer = styled.div`
  box-sizing: border-box;
  padding: 24px 41px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.gray_white};
  border-radius: 9px;
`;

const StyledFormUl = styled.ul`

`;

const StyledFormList = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const StyledInputTag = styled.div`
  color: ${({ theme }) => theme.colors.gray_white};
  margin-right: 10px;
  line-height: 48px;
  white-space: nowrap;
`;

const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.colors.whiteGray};
  font-size: 15px;
  width: 195px;
  height: 48px;
  padding: 10px;
  border: 0;
  border-radius: 15px;
`;

const StyledSubmitButton = styled.button`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue};
  float: right;
  clear: right;
  line-height: 31px;
  font-size: 16px;
  width: 74px;
  height: 31px;
  border: 0;
  border-radius: 25px;
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.colors.background_blue};
  }
`;

const StyledCarouselWrapper = styled.div`
  margin-top: 20px;
`;

const StyledNoTopicText = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  line-height: 31px;
  margin: 0 auto;
`;

const validationSchema = yup.object().shape({
  title: yup.string()
    .required("제목을 입력하세요.")
    .min(2, "제목은 최소 2자 이상이어야 합니다.")
    .max(30, "30자 이내로 작성해 주세요."),
  subTitle: yup.string()
    .required("내용을 적어주세요.")
    .max(100, "100자 이내로 작성해 주세요."),
  capability: yup.number()
    .min(2)
    .max(100, "2~100 이내에서 적절한 숫자를 입력해주세요.")
})

interface InitialValues {
  title: string;
  category: string;
  subTitle: string;
  capability: number,
}

const CreateRoomPage: FC<CreateRoomPageProps> = ({

}) => {
  const { topicStore, roomStore, sessionStore } = useMobxStores();
  enum TopicEnum {
    CHANGE_TOPIC = "CHANGE_TOPIC",
  }

  const topicReducer = (topicState: Topic, topicAction: {
    type: TopicEnum;
    payload: Topic;
  }) => {
    switch (topicAction.type) {
      case TopicEnum.CHANGE_TOPIC:
        return {
          ...topicState,
          ...topicAction.payload,
        }
      default:
        return topicState;
    }
  }

  const initialTopicState: Topic = {
    ...topicStore.topicList.find(({ category }: Topic) => category === "netflix")
  }
  const [topicState, dispatchTopic] = useReducer(topicReducer, initialTopicState)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null | ArrayBuffer>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [contentsLoading, setContentsLoading] = useState(false);
  const [isModal, setIsModal] = useModal();
  const imageFormContainerRef = useRef<HTMLDivElement>(null);
  const formSelectorRef = useRef<HTMLLabelElement>(null);

  const handleUpdateFetchRooms = async (category: string) => {
    try {
      setContentsLoading(true);
      await roomStore.fetchRooms({ category, clear: true })
    } catch (error) {
      console.error(error);
    } finally {
      setContentsLoading(false);
    }
  }

  const handleClickTopicSelector = async (topic: Topic) => {
    dispatchTopic({
      type: TopicEnum.CHANGE_TOPIC,
      payload: topic,
    });
    setImagePreviewUrl(topic.image);

    await handleUpdateFetchRooms(topic.category);
  }

  const renderTopicSelector = () => {
    const reducedList: Record<string, Array<JSX.Element>> = {};

    topicStore.topicList.forEach((topic: Topic, index: number) => {
      const key = Math.floor(index / 2);
      if (!reducedList.hasOwnProperty(key)) {
        reducedList[key] = [];
      };
      reducedList[key].push(
        <TopicSelector
          rightBorder={index % 2 === 0}
          isSelected={topic.category === topicState.category}
          onClick={useCallback(() => handleClickTopicSelector(topic), [])}
        >
          {topic.category}
        </TopicSelector>
      )
    })
    const jsx = Object.values(reducedList).map((jsxArray, index) => {
      return (
        <TopicSelectorList key={`$:: jsxArray_${index} `}>
          {jsxArray}
        </TopicSelectorList>
      )
    });

    return jsx;
  };

  useEffect(() => {
    handleUpdateFetchRooms(topicState.category);
    if (
      imageFormContainerRef &&
      imageFormContainerRef.current &&
      formSelectorRef &&
      formSelectorRef.current
    ) {

    }
  }, [])

  const validateImage = (file: File) => {
    if (!["jpg", "jpeg", "png"].includes(file.type.split("/")[1].toLowerCase())) {
      throw Error("type error")
    }
    if (file.size > 3000000) {
      throw Error("size error");
    }
    return true;
  }

  const handleChangeInputImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageLoading(true);
      try {
        validateImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviewUrl(reader.result);
          setImageLoading(false);
        }
        reader.readAsDataURL(file);
      } catch (error) {
        openToast(
          <DefaultToast
            title={error === "size error" ?
              "이미지 크기가 너무 큽니다." :
              "올바른 형식의 파일이 아닙니다."
            }
            message={
              error === "size error" ?
                "3mb 미만의 이미지를 입력해주세요" :
                ".png, .jpeg, .jpg 파일을 올려주세요."
            }
          />,
          {
            position: "top",
          },
        )
        setImageLoading(false);
      }
    }
  }

  const { openToast } = useToast();

  const handleSubmit: FormikConfig<InitialValues>["onSubmit"] = async (values, { setSubmitting }) => {
    const studentNumber: Profile["studentNumber"] = sessionStore.userProfile.studentNumber;
    const fetchPostRoomParam = {
      ...values,
      studentNumber,
      category: topicState.category,
    }
    try {
      const response = await roomStore.fetchPostRoom(fetchPostRoomParam);
      if (response) {
        openToast(<DefaultToast title="방 생성 성공!" message="홈으로 돌아가 생성된 방에 입장해보세." />, {
          position: "bottom",
        })
      }
    } catch (error) {
      if (error.status === 403) {
        openToast(<DefaultToast title="카테고리 중복" message="해당 카테고리는 더 이상 생성할 수 없습니다." />, {
          position: "bottom",
        })
      }
    } finally {
      setSubmitting(false);
    }

  }

  const handleClickCard = (data: GetRoomPayload["room"]) => {
    return (e: React.MouseEvent<HTMLDivElement>) => {
      setIsModal({
        type: "OPEN",
        payload: {
          data,
          visible: true,
        }
      })
    }
  }

  return (
    <StyledSelf>
      <StyledSection>
        <StyledArticle>
          <StyledTitle>원하는 토픽을 선택하고 직접 방장이 되어보세요.</StyledTitle>
          <StyledFormWrapper>
            <TopicSelectorContainer>
              {renderTopicSelector()}
            </TopicSelectorContainer>
            <ImageFormContainer ref={imageFormContainerRef}>
              {
                imageLoading
                  ? (
                    <LoadingContainer>
                      <Loading
                        width={"40px"}
                        height={"40px"}
                        position={{
                          top: "50%",
                          bottom: "50%",
                        }}
                      />
                    </LoadingContainer>
                  )
                  : <ImagePreview imageUrl={imagePreviewUrl as string | null ?? topicState.image} />
              }
              <ImageFormSelector
                htmlFor="fileInput"
                ref={formSelectorRef}
              >
                입력
              </ImageFormSelector>
              <HiddenImageInput
                type="file"
                id="fileInput"
                onChange={handleChangeInputImage}
              />
            </ImageFormContainer>
            <FormContainer>
              <Formik
                validationSchema={validationSchema}
                initialValues={{
                  title: "",
                  category: topicState.category,
                  subTitle: "",
                  capability: 4,
                }}
                onSubmit={handleSubmit}
              >{
                  ({ handleSubmit, isSubmitting, errors, touched }) => (
                    <form onSubmit={handleSubmit}>
                      <StyledFormUl>
                        <StyledFormList>
                          <StyledInputTag>제목:</StyledInputTag>
                          <Field
                            name="title"
                            as={StyledInput}
                            errors={errors}
                            touched={touched}
                          />
                        </StyledFormList>
                        <StyledFormList>
                          <StyledInputTag>카테고리:</StyledInputTag>
                          <Field
                            name="category"
                            disabled
                            value={topicState.category}
                            as={StyledInput}
                            errors={errors}
                            touched={touched}
                          />
                        </StyledFormList>
                        <StyledFormList>
                          <StyledInputTag>내용:</StyledInputTag>
                          <Field
                            name="subTitle"
                            as={StyledInput}
                            errors={errors}
                            touched={touched}
                          />
                        </StyledFormList>
                        <StyledFormList>
                          <StyledInputTag>방 인원:</StyledInputTag>
                          <Field
                            name="capability"
                            as={StyledInput}
                            type="number"
                            errors={errors}
                            touched={touched}
                          />
                        </StyledFormList>

                      </StyledFormUl>
                      <StyledSubmitButton type="submit" disabled={isSubmitting}>{
                        isSubmitting ?
                          <Loading width="15px" height="15px" /> :
                          "생성"
                      }</StyledSubmitButton>
                    </form>
                  )
                }
              </Formik>
            </FormContainer>
          </StyledFormWrapper>
        </StyledArticle>
        <StyledArticle>
          <StyledTitle>'{topicState.category}' 토픽에 대한 멤버를 구하고 있어요!</StyledTitle>
          <StyledCarouselWrapper>
            {contentsLoading && (
              <Loading width="30px" height="30px" />
            )}
            {
              !contentsLoading && (
                roomStore.roomList?.length > 0 ?
                  <CreationCarousel contents={roomStore.roomList} onClickCard={handleClickCard} /> :
                  <StyledNoTopicText>`{topicState.category}` 토픽 주제의 방이 없습니다. 방 개설의 첫 주인공이 되어보세요!</StyledNoTopicText>
              )
            }

          </StyledCarouselWrapper>
        </StyledArticle>
      </StyledSection>
      <StyledSection>
        {isModal.visible && <Modal {...isModal.data} />}
      </StyledSection>
    </StyledSelf>
  )
};

export default observer(CreateRoomPage);