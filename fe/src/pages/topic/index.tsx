import React, { FC, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TopicState } from '@store/topic';

interface Props extends RouteComponentProps { 
}
const TopicPage: FC<Props> = withRouter(({
  location : {
    search
  }  
}) => {
  
  return(
    <>
    </>
  )
});

export default TopicPage; 