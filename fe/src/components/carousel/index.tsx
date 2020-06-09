import React, { FC, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Indicator } from './indicator'; 
import useResize from '@utils/carousel/windowResize';
/***
 * @component
 *  carousel slides are in these structures
 * <SliderContainer />  <- outmost container that wrapped whole container. Must has width same as parent.
 * <Slider /> <- As name quoted, when next and prev button clicked, this component's state changes and give animiation effect
 * <Slide /> <- actual content component. div box contain images as background-image css.  
 */

const Button = styled.button`
  height:100%;
  bottom: 0;
  position: absolute;
  background-color: ${p => p.theme.colors.transparent};
  cursor: pointer;
  opacity: 0;
  transition: all 0.5s ease;
  &:hover {
    opacity:0.5; 
  }
  &:first-child{
    left:0;
  }
  &:last-child{
    right: 0;
  }
`;

// parent covering Slider
const SliderContainer = styled.div` 
  width: 100%;
  overflow: hidden;
  position:relative;
  margin: 0 auto;
`;

const Slider = styled.div<{
  parentWidth: number 
  transition: number
  translation: number 
}>` 
  display: flex;
  width: ${p => p.parentWidth}px; 
  transform: translateX(-${p => p.translation}px);
  transition: transform ease-out ${p => p.transition}s;
  overflow:hidden;
`;


type StateProps = {
  activeIndex: number; 
  transition: number; 
  translate: number; 
}

export const Carousel: FC = ({
  children
}) => {
  const parentRef = useRef<HTMLDivElement>(null); 
  const [state, setState ] = useState<StateProps>({
    activeIndex: 0,
    translate: 0,
    transition: 0.25
})
  const parentWidth = useResize(parentRef);
  const { activeIndex, translate, transition } = state;
  const total = React.Children.count(children); 
  const nextSlide = () => {
    if( activeIndex < total -1 ){ 
      setState({ 
        transition: 0.5,
        translate: (activeIndex + 1) * parentWidth ,
        activeIndex: activeIndex +1 
       });
    } else if( activeIndex === total-1 ){
      setState({
        transition: 0, 
        translate: 0,
        activeIndex: 0
      })
    }
  }
  
  const prevSlide = () => {
    if( activeIndex > 0 ){
      setState({
        transition: 0.5,
        translate: (activeIndex -1) * parentWidth,
        activeIndex: activeIndex -1
      })
    } else if( activeIndex === 0 ){
      setState({
        transition: 0,
        translate: (total-1) * parentWidth,
        activeIndex: total-1 
      })
    }
  }
  return(
    <SliderContainer ref={parentRef}>
      <Slider
        translation={translate}
        transition={transition}
        parentWidth={parentWidth * total}
      >
        {children}        
      </Slider>   
      <Indicator now={activeIndex+1} total={total}/>
      <Button onClick={prevSlide}>left</Button>
      <Button onClick={nextSlide}>right</Button>
    </SliderContainer>
  )
} 