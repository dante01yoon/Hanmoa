import React,  { FC, useState, useEffect, SyntheticEvent } from 'react';
import * as Styled from './style';
import { Carousel } from 'src/components/carousel';
import { Slide } from 'src/components/carousel/slide'; 
import { Card } from 'src/components/card'; 
import { ProgressBar } from 'src/components/progress';
import { dummyData } from './dummy';
import { Modal } from 'src/components/modal';
import { CardData } from 'src/models/card';
import { useModal, useModalState, useModalDispatch } from 'src/utils/modal/useModal';


// carousel contents : jpg 
import Adobe from 'src/asset/adobe.jpg';
import NetflixPhone from 'src/asset/netflix_phone.jpg';
import Netflix from 'src/asset/netflix.jpg';

const {
  RoomContainer
} = Styled; 


const HomePage: FC =( ) =>{
    const [array, setArray] = useState([] as ReturnType<typeof dummyData> )
    const [ state, dispatch ] = useModal(); 
    useEffect(() => {
      setTimeout(() => {
        setArray(dummyData()); 
      },700);
    },[])
    const handleClick : (data: CardData ) => void = (data) => {
      dispatch({
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
          {state.visible && <Modal data={state.data} />}
        </section>
        <section>
          <RoomContainer>
            {
              array.length > 0 ? 
                array.map((value) => {
                  return <Card
                    data={value} 
                    key={value.id} 
                    handleClick={() => handleClick(value)}
                   /> 
                })
               : 
              <ProgressBar/>
            }
          </RoomContainer>
        </section>
      </>
    )
}

export default HomePage;