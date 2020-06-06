import React, { FC, useEffect, useState, createRef, useRef } from 'react';
import styled from 'styled-components';
import { Indicator } from './indicator'; 
import { resizeWindow } from '@utils/carousel/windowResize';
/***
 * @component
 *  carousel slides are in these structures
 * <SliderContainer />  <- outmost container that wrapped whole container. Must has width same as parent.
 * <Slider /> <- As name quoted, when next and prev button clicked, this component's state changes and give animiation effect
 * <Slide /> <- actual content component. div box contain images as background-image css.  
 */
const Button = styled.button`
  position:absolute;
  top: 0;
  height:100%;
  all: unset; 
  border: 1px solid ${p => p.theme.colors.cyan};
  border-radius: 8px;
  background-color: ${p => p.theme.colors.cyan};
  cursor: pointer;
  opacity: 1;
  transition: all 0.4 ease-in;
  &:hover {
    opacity:1; 
  }
  background-color: yellow;
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


// <{
//   transition: number,  
//   parentWidth: number
//   translate: number,
// }>

// actual moving Slider
const Slider = styled.div<{
  parentWidth: number 
  transition: number
  translation: number 
}>` 
  display: flex;
  width: 1280px;
  transform: translateX(-${p => p.translation}px);
  transition: transform ease-out ${p => p.transition}s;
  overflow:hidden;
`;

// width: ${p => p.parentWidth}px; 

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
  const [parentWidth, setParentWidth] = resizeWindow(parentRef); 

  const { activeIndex, translate, transition } = state;
  const total = React.Children.count(children); 
  // 4 carousel slides  ... 0  1  2  3 
  const nextSlide = () => {
    if( activeIndex < total -1 ){ 
      setState({ 
        ...state,
        translate: (activeIndex + 1) * parentWidth,
        activeIndex: activeIndex +1 
       });
    } else if( activeIndex === total-1 ){
      setState({
        ...state, 
        translate: 0,
        activeIndex: 0
      })
    }
    console.log(state);

  }
  
  const prevSlide = () => {
    if( activeIndex > 0 ){
      setState({
        ...state,
        translate: (activeIndex -1) * parentWidth,
        activeIndex: activeIndex -1
      })
    } else if( activeIndex === 0 ){
      setState({
        ...state,
        translate: (total-1) * parentWidth,
        activeIndex: total-1 
      })
    }
    console.log(state);
  }
  useEffect(()=> {
     if(parentRef.current){
      // resizeWindow(parentRef);
    }
  },[activeIndex]); 
  return(
    <SliderContainer ref={parentRef}>
      <Slider
        translation={translate}
        transition={transition}
        parentWidth={parentWidth * total}
      >
        {children}        
      </Slider>   
      <Indicator now={1} total={total}/>
      <Button onClick={prevSlide}>left</Button>
      <Button onClick={nextSlide}>right</Button>
    </SliderContainer>
  )
} 