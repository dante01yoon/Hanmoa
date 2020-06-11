import React, { FC } from 'react';

import * as Styled from './style';
const { 
    ProgressContainer,
    GaiaCircle,
    MotherCircle,
    ChildCircle,
    InnerCircle,
    InnerMostCircle,
    Wrapper
} = Styled;
export const ProgressBar:FC<{
    color?: string; 
    size?: string; 
    content?: string; 
}> = ({
    color,
    size,
    content 
}) => {
    return(
      <Wrapper> 
        <ProgressContainer>
            <GaiaCircle>
                <MotherCircle>
                    <ChildCircle>
                        <InnerCircle>
                            <InnerMostCircle/>
                            {content} 
                        </InnerCircle>
                    </ChildCircle>
                </MotherCircle>
            </GaiaCircle>
        </ProgressContainer>
      </Wrapper>
    )
}
