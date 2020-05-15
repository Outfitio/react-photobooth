import React from "react";
import styled, { keyframes } from "styled-components";
import { useAppState } from "../providers/appState";
import { ReactComponent as Tick } from "../assets/tick.svg";
import Spinner from "../components/spinner";

const TickIcon = styled(Tick)`
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const StyledSpinner = styled(Spinner)`
  margin-right: 0.5rem;
`;

const Text = styled.p`
  opacity: 0.6;
  padding-right: 2rem;
  display: flex;
  align-items: center;
`;

const FadeOutText = styled.p`
  animation: 0.5s ${fadeOut} ease-out 2s forwards;
  opacity: 1;
  padding-right: 2rem;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: #326295;
`;

export default function GeneratingTag() {
  const { isGenerating } = useAppState();

  if (isGenerating === true) {
    return (
      <Text>
        <StyledSpinner small bgColor="rgb(0,0,0,0.2)" spinnerColor="#000" />
        Generating
      </Text>
    );
  } else {
    return (
      <FadeOutText>
        <TickIcon />
        Generated
      </FadeOutText>
    );
  }
}
