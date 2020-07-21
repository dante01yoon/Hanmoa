import styled, { keyframes, css } from "styled-components";


const DummySkeletonColor = "#eee" as const;

const skeletonLoading = keyframes`
  0% {
    transform: translateX(0);
  }
  50%,
  100% {
    transform: translateX(264px);
  }
`;

const createSkeleteonAnimation = (width = "24px", height = "100%") => css`
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: ${width};
    height: ${height};
    background: linear-gradient(
      to right,
      ${(p) => p.theme.colors.gray_100},
      ${(p) => p.theme.colors.gray_white},
      ${(p) => p.theme.colors.gray_100}
    );
    animation: ${skeletonLoading} 1.5s infinite linear;
  }
  overflow: hidden;
  position: relative;
`;

export {
    DummySkeletonColor,
    skeletonLoading,
    createSkeleteonAnimation,
}