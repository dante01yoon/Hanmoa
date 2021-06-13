import React, { FC, useReducer, useEffect, useCallback, useRef, useState } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { useMobxStores } from "@utils/store/useStores";
import { GetRoomPayload, Topic } from "src/payload";
import { Formik } from "formik";
import * as yup from "yup";
import Field from "@components/form/field";
import Loading from "@components/loading";
import CreationCarousel from "@components/carousel/creationCarousel";
import { useModal } from "src/utils/modal/useModal";
import { Modal } from "src/components/modal";

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

const validationSchema = yup.object().shape({
  title: yup.string()
    .min(2, "제목은 최소 2자 이상이어야 합니다.")
    .max(30, "30자 이내로 작성해 주세요."),
  content: yup.string()
    .max(100, "100자 이내로 작성해 주세요."),
  member: yup.number()
    .min(2)
    .max(100, "2~100 이내에서 적절한 숫자를 입력해주세요.")
})

interface InitialValues {
  title: string;
  category: string;
  content: string;
  member: number,
}

const CreateRoomPage: FC<CreateRoomPageProps> = ({

}) => {
  const { topicStore } = useMobxStores();
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
  const [isModal, setIsModal] = useModal();
  const imageFormContainerRef = useRef<HTMLDivElement>(null);
  const formSelectorRef = useRef<HTMLLabelElement>(null);
  const handleClickTopicSelector = (topic: Topic) => {
    dispatchTopic({
      type: TopicEnum.CHANGE_TOPIC,
      payload: topic,
    });
    setImagePreviewUrl(topic.image);
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
    if (
      imageFormContainerRef &&
      imageFormContainerRef.current &&
      formSelectorRef &&
      formSelectorRef.current
    ) {

    }
  }, [])

  const handleChangeInputImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setImageLoading(true);
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
        setImageLoading(false);
      }
      reader.readAsDataURL(file);
    }
  }

  const handleSubmit = () => {

  }

  const dummy = {
    "imageUrl": "",
    "join": [
      {
        "profile": {
          "picture": "/static/images/default_profile.png",
          "name": "RU Who",
          "studentNumber": "21500492",
          "email": "21500492@handong.edu",
          "id": "85ed6"
        },
        "joinIn": [
          "60a64c06d19616367780fe84"
        ],
        "hostIn": [],
        "_id": "60a64bf9d19616367780fe83",
        "createdAt": "2021-05-20T11:46:01.543Z",
        "updatedAt": "2021-05-20T11:46:14.750Z",
        "__v": 1
      },
      {
        "profile": {
          "picture": "/static/images/default_profile.png",
          "name": "jaewon Yoon",
          "studentNumber": "21300492",
          "email": "21300492@handong.edu",
          "id": "b6e15"
        },
        "joinIn": [
          "60a64c06d19616367780fe84"
        ],
        "hostIn": [],
        "_id": "60a64a51746f8a341b436b73",
        "createdAt": "2021-05-20T11:38:57.476Z",
        "updatedAt": "2021-05-21T13:33:42.013Z",
        "__v": 1
      }
    ],
    "messages": [
      "60a64c5fa386e836a1c80d5c",
      "60a7b1698df759e65ff6140c"
    ],
    "hasPassword": true,
    "_id": "60a64c06d19616367780fe84",
    "title": "auth 룸 조인 테스트",
    "subTitle": "3명 구합니다",
    "host": {
      "profile": {
        "picture": "/static/images/default_profile.png",
        "name": "RU Who",
        "studentNumber": "21500492",
        "email": "21500492@handong.edu",
        "id": "85ed6"
      },
      "joinIn": [
        "60a64c06d19616367780fe84"
      ],
      "hostIn": [],
      "_id": "60a64bf9d19616367780fe83",
      "createdAt": "2021-05-20T11:46:01.543Z",
      "updatedAt": "2021-05-20T11:46:14.750Z",
      "__v": 1
    },
    "topic": {
      "category": "netflix",
      "url": "netflix"
    },
    "createdBy": "60a64bf9d19616367780fe83",
    "capability": 4,
    "password": "1234",
    "gradient": "linear-gradient(90deg, rgba(65,75,75,0.7105217086834734) 0%, rgba(197,206,212,1) 100%)",
    "id": "32dc0",
    "time": "2021-05-20T11:46:14.349Z",
    "__v": 3,
    "hasJoinedRoom": true,
    "current": 2,
    "joinPossible": true
  }
  const dummyContents = new Array(10).fill(dummy);

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
                  content: "",
                  member: 4,
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
                            name="content"
                            as={StyledInput}
                            errors={errors}
                            touched={touched}
                          />
                        </StyledFormList>
                        <StyledFormList>
                          <StyledInputTag>방 인원:</StyledInputTag>
                          <Field
                            name="member"
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
            <CreationCarousel contents={dummyContents} onClickCard={handleClickCard} />
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