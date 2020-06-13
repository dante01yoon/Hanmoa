import React,  { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store/index';  
import { topicCreator} from '@store/topic'; 
import * as Styled from './style';
import { Carousel } from 'src/components/carousel';
import { Slide } from 'src/components/carousel/slide'; 
import { Card } from 'src/components/card'; 
import { ProgressBar } from 'src/components/progress';
import { dummyData } from './dummy';
import { Modal } from 'src/components/modal';
import { CardData } from 'src/models/card';
import { useModal } from '@utils/modal/useModal';
import { pathExtractor } from '@utils/topic/pathExtractor'; 


// carousel contents : jpg 
import Adobe from 'src/asset/adobe.jpg';
import NetflixPhone from 'src/asset/netflix_phone.jpg';
import Netflix from 'src/asset/netflix.jpg';

const {
  RoomContainer
} = Styled; 


const HomePage = withRouter(({
  location: {
    pathname
  }
}) =>{
    // const [array, setArray] = useState([] as ReturnType<typeof dummyData> )
    const [ isModal, setModal ] = useModal();
    const { data, isLoading } = useSelector((state: RootState) => state.topic);
    const dispatch= useDispatch();
    const { fetch}  = topicCreator; 
    useEffect(() => {
      console.log('path: ', pathname);
      const [ include, exclude ] = pathExtractor(pathname); 
      dispatch(fetch()); 
    },[])
    const handleClick : (data: CardData ) => void = (data) => {
      setModal({
        type: 'OPEN', 
        payload: {
          data,
          visible: true
        }
      });
    }
    return(
      <>
        <section>
          <Carousel>
            <Slide url={Netflix} />
            <Slide url={Adobe} />
            <Slide url={NetflixPhone} />    
          </Carousel>
        </section>
        <section>
          {isModal.visible && <Modal data={isModal.data} />}
        </section>
        <section>
          <RoomContainer>
            {
              isLoading ?
                <ProgressBar/>
                :
                data.map((value) => {
                  return <Card
                    data={value} 
                    key={value.id} 
                    handleClick={() => handleClick(value)}
                   /> 
                })
            }
          </RoomContainer>
        </section>
      </>
    )
}); 

export default HomePage;