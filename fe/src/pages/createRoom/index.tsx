import React, { FC, useReducer, useEffect, useCallback, useRef, useState } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { useMobxStores } from "@utils/store/useStores";
import { Topic } from "src/payload";
import { Formik } from "formik";
import yup from "yup";
import Field from "@components/form/field";
import Loading from "@components/loading";

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
  color: #555555;
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
  background-color: ${({isSelected}) => isSelected ? "#E5E5E5" : "transparent"};
  font-size: 15px;
  width: 70px;
  height: 40px;
  border-right: ${({rightBorder}) => rightBorder ? "1px solid #E5E5E5" : 0};
  cursor: pointer;

  &:hover{
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
  background: url(${({imageUrl}) => imageUrl})  no-repeat center/100%; 
  width: 296px;
  height: 168px;
`;

const ImageFormSelector = styled.label`
  position: absolute;
  left: 50%;
  bottom: 14px;
  color: #fff;
  background-color: rgba(40, 121, 216, 0.75);
  line-height: 31px;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  width: 74px;
  height: 31px;
  transform: translate(-50%,-50%);
  border-radius: 25px;
  cursor: pointer;

  &:hover{
    background-color: ${({theme}) => theme.colors.background_blue} 
  }
`

const HiddenImageInput = styled.input`
  display: none;
`;

const FormContainer = styled.div`
  width: 352px;
  height: 300px;
  box-sizing: border-box;
  padding: 24px 41px;
  border: 1px solid;
  border-color: ${({theme}) => theme.colors.gray_white};
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
  margin-right: 10px;
  line-height: 48px;
`;

const StyledInput = styled.input`
  background-color: ${({theme}) => theme.colors.whiteGray};
  font-size: 15px;
  width: 195px;
  height: 48px;
  padding: 10px;
  border: 0;
  border-radius: 15px;
`;

const StyledSubmitButton =styled.button`
  color: ${({theme}) => theme.colors.white};
  background-color: ${({theme}) => theme.colors.background_blue};
  float: right;
  clear: right;
  line-height: 31px;
  font-size: 16px;
  width: 74px;
  height: 31px; 
  border: 0;
  border-radius: 25px;
  cursor: pointer;
`;

const CreateRoomPage: FC<CreateRoomPageProps> = ({
  
}) => {
  const { topicStore } = useMobxStores();
  enum TopicEnum {
    CHANGE_TOPIC= "CHANGE_TOPIC",
  }

  const topicReducer = (topicState: Topic, topicAction: {
    type: TopicEnum;
    payload: Topic;
  }) => {
    switch(topicAction.type){
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
    ...topicStore.topicList.find(({category}: Topic) => category === "netflix")
  }
  const [ topicState, dispatchTopic ] = useReducer(topicReducer,initialTopicState)
  const [ imagePreviewUrl, setImagePreviewUrl ] = useState<string | null | ArrayBuffer>(null);
  const [imageLoading, setImageLoading] = useState(false);
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
    const reducedList: Record<string,Array<JSX.Element>> = {};
    
    topicStore.topicList.forEach((topic: Topic, index: number) => {
      const key = Math.floor(index / 2);
      if(!reducedList.hasOwnProperty(key)){
        reducedList[key] = [];
      };
      reducedList[key].push(
        <TopicSelector 
          rightBorder={index % 2 === 0}
          isSelected={topic.category === topicState.category}
          onClick={useCallback(() => handleClickTopicSelector(topic),[])}
        >
          {topic.category}
        </TopicSelector>
      )
    })
    const jsx = Object.values(reducedList).map((jsxArray, index) => {
      return (
        <TopicSelectorList key={`$::jsxArray_${index}`}>
          {jsxArray}
        </TopicSelectorList>
      )
    });

    return jsx;
  };
  useEffect(() => {
    if(
      imageFormContainerRef && 
      imageFormContainerRef.current &&
      formSelectorRef && 
      formSelectorRef.current
    ){
       
    }
  },[])

  const handleChangeInputImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if(e.target.files && e.target.files[0]){
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
                            top: "25px",
                          }}
                        />
                      </LoadingContainer>
                    )
                  : <ImagePreview imageUrl={imagePreviewUrl as string | null ?? topicState.image}/>
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
                initialValues={{
                  title: "",
                  category: topicState.category,
                  content: "",
                  member: 4,
                }}
                onSubmit={handleSubmit}
              >{
                ({handleSubmit, isSubmitting}) => (
                  <form onSubmit={handleSubmit}>
                    <StyledFormUl>
                      <StyledFormList>
                        <StyledInputTag>제목:</StyledInputTag>
                        <Field name="title" as={StyledInput} />
                      </StyledFormList>
                      <StyledFormList>
                        <StyledInputTag>카테고리:</StyledInputTag>
                        <Field 
                          name="category" 
                          disabled
                          value={topicState.category}
                          as={StyledInput} 
                        />
                      </StyledFormList>
                      <StyledFormList>
                        <StyledInputTag>내용:</StyledInputTag>
                        <Field 
                          name="content" 
                          as={StyledInput}
                        />
                      </StyledFormList>
                      <StyledFormList>
                        <StyledInputTag>방 인원:</StyledInputTag>
                        <Field 
                          name="member" 
                          as={StyledInput}
                          type="number"
                        />
                      </StyledFormList>
                      
                    </StyledFormUl>
                    <StyledSubmitButton type="submit" disabled={isSubmitting}>{
                      isSubmitting ? 
                      <Loading width="15px" height="15px"/> :
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
        </StyledArticle>
      </StyledSection>
    </StyledSelf>
  )
};

export default observer(CreateRoomPage);