import React,  { FC, useState, useEffect } from 'react';
import * as Styled from './style';
import { Carousel } from 'src/components/carousel';
import { Slide } from 'src/components/carousel/slide'; 
import { Card } from 'src/components/card'; 
import { dummyData } from './dummy';
import Adobe from 'src/asset/adobe.jpg';
import NetflixPhone from 'src/asset/netflix_phone.jpg';
import Netflix from 'src/asset/netflix.jpg';

const {
  RoomContainer
} = Styled; 


const HomePage: FC =( ) =>{
    const [array, setArray] = useState([] as ReturnType<typeof dummyData> )
    useEffect(() => {
      setArray(dummyData()); 
    },[]);
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
              <div> ... loading </div>
            }
          </RoomContainer>
        </section>
      </>
    )
}

export default HomePage;