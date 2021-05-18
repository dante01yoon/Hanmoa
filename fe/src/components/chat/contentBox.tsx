import React from "react";
import styled from "styled-components";

const StyledSelf = styled.p`
    padding: 16px;
    background-color: ${(p) => p.theme.colors.whiteGray};
    min-width: 32px;
    max-width: 200px;
    min-height: 32px;
    line-height: 1;
    border-radius: 8px;
`;

interface ContentBoxProps {
    data: string;
    onClickCard: Function;
}
const ContentBox: React.FC<ContentBoxProps> = ({
    data,
    onClickCard,
}) => {
    const handleClickCard = () => {
        onClickCard();
    }

    return (
        <StyledSelf onClick={handleClickCard}>
            {data}
        </StyledSelf>
    );
}

export default ContentBox;