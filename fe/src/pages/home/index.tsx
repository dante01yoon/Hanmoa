import React,  { FC } from 'react';
import { Carousel } from 'src/components/carousel';
import { Slide } from 'src/components/carousel/slide'; 

import { Adobe } from 'src/asset/adobe.jpg';
import { NetflixPhone } from 'src/asset/netflix_phone.jpg';
import { Netflix } from 'src/asset/netflix.jpg';


const HomePage: FC =( ) =>{
    return(
      <>
        <Carousel>
          <Slide src={Netflix} />
          <Slide src={Adobe} />
          <Slide src={NetflixPhone} />    
        </Carousel>
      </>
    )
}

export default HomePage;