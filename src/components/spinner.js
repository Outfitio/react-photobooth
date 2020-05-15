import React from "react";
import styled, { keyframes } from "styled-components";

const spinning = keyframes`
  to { -webkit-transform: rotate(360deg); }
`;

const SpinningWheel = styled.div`
  display: inline-block;
  width: ${(props) => (props.small ? "1.25rem" : "2.5rem")};
  height: ${(props) => (props.small ? "1.25rem" : "2.5rem")};
  border: 0.15em solid
    ${(props) => (props.bgColor ? props.bgColor : "rgb(255,255,255,0.3)")};
  border-radius: 50%;
  border-top-color: ${(props) =>
    props.spinnerColor ? props.spinnerColor : "#ffffff"};
  animation: ${spinning} 1s ease-in-out infinite;
`;

export default function Spinner({ spinnerColor, bgColor, small, className }) {
  return (
    <SpinningWheel
      className={className}
      small={small}
      spinnerColor={spinnerColor}
      bgColor={bgColor}
    />
  );
}
