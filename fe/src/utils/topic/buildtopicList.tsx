import React from 'react';
import { Route } from 'react-router-dom';
import {
  TopicList,
  Topic
} from '@components/gnb/style';

import { SmartLink} from '@components/smartlink';
import { TopicItem, TopicData } from '@models/gnb/topic';

/**
 * @params data: TopicData 
 * @returns jsx TopicList used in Topic GNB
 */
export function buildTopicList(items: TopicItem[]){
  let jsxList = new Array();

  while(items.length){
    const topicList = [] as TopicItem[];
    while(items.length && topicList.length < 3){
      const item = items.shift();
      item && topicList.push(item); 
    }
    jsxList.push(
      <TopicList>
        {
          topicList.map((value,index) => { 
            return(
              <Route 
                render={({history}) => (
                <Topic 
                  key={index} 
                  onClick={() => {history.push(`${value.url}`)}}
                >
                  {value.name}
                </Topic>
              )}/>
              
            )
          })
        }
      </TopicList>
    ) 
  }
  return jsxList;
}

{/* <TopicList>
<Topic>
  <SmartLink>
    전체보기
  </SmartLink>
</Topic>
<Topic>
  <SmartLink>
    브랜딩/마케팅
  </SmartLink>
</Topic>
<Topic>
  <SmartLink>
    비즈니스 전략
  </SmartLink>
</Topic> 
</TopicList> */}