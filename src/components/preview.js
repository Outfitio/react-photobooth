import React, { Fragment } from "react";
import styled from "styled-components";
import { useAppState } from "../providers/appState";

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  padding: 1rem 0 1rem 0;

  @media (min-width: 900px) {
    padding: 2rem;
  }
`;

const Square = styled.div`
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  padding-bottom: 100%;
  overflow: hidden;
  border-radius: 0.33rem;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  background-color: #abadae;

  @media (max-width: 900px) {
    width: 100%;
  }

  & > div:first-child {
    filter: brightness(1.15) contrast(0.9);
  }
`;

const Rect = styled.div`
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  padding-bottom: 52.2%;
  overflow: hidden;
  border-radius: 0.33rem;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  background-color: #abadae;

  @media (max-width: 900px) {
    width: 100%;
  }

  & > div:first-child {
    filter: brightness(1.1);
  }
`;

const Img = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: ${(props) => `url(${props.imageSrc})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export default function Preview({ size }) {
  const { imageUrl } = useAppState();
  return (
    <Fragment>
      {size === "square" ? (
        <PreviewContainer>
          <Square>{imageUrl && <Img imageSrc={imageUrl} />}</Square>
        </PreviewContainer>
      ) : (
        <PreviewContainer>
          <Rect>{imageUrl && <Img imageSrc={imageUrl} />}</Rect>
        </PreviewContainer>
      )}
    </Fragment>
  );
}
