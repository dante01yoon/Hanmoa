import React,  { FC, useState, useEffect } from 'react';
import * as Styled from './style';
import { Carousel } from 'src/components/carousel';
import { Slide } from 'src/components/carousel/slide'; 
import { Card } from 'src/components/card'; 
import { ProgressBar } from 'src/components/progress';
import { dummyData } from './dummy';

// carousel 
import Adobe from 'src/asset/adobe.jpg';
import NetflixPhone from 'src/asset/netflix_phone.jpg';
import Netflix from 'src/asset/netflix.jpg';

const {
  RoomContainer
} = Styled; 


const HomePage: FC =( ) =>{
    const [array, setArray] = useState([] as ReturnType<typeof dummyData> )
    useEffect(() => {
      setTimeout(() => {
        setArray(dummyData()); 
      },700);
    },[])
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
          <RoomContainer>
            {
              array.length > 0 ? 
                array.map((value) => {
                  return <Card data={value} key={value.id} /> 
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