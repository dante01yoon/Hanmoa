import React, { FC, useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TopicState } from '@store/topic';
import { Modal } from '@components/modal';
import { useModal } from '@utils/modal/useModal'; 
const TopicPage = withRouter(({
  location : { 
    pathname
  } 
}) => {
  const [ state, dispatch] = useModal(); 
  useEffect(() => {
    console.log(pathname);
  })
  return(
    <section>
      {state.visible && <Modal data={state.data} />}
    </section>
    
  )
});

export default TopicPage; 