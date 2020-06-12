import React, { Fragment, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Preview from "./preview.js";
import { useAppState } from "../providers/appState";
import Spinner from "../components/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FacebookProvider, Share } from "react-facebook";

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  filter: ${(props) => (props.imageUrl ? "blur(0)" : "blur(5px)")};
  visibility: ${(props) => (props.imageUrl ? "visible" : "hidden")};
  transition: cubic-bezier(0.68, 0.03, 0.86, 0.96) all 0.8s;

  @media (min-width: 900px) {
    flex-direction: row;
  }
`;

const Col = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > div {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  p {
    @media (min-width: 900px) {
      padding-left: 2em;
      margin-top: 0;
    }
  }

  @media (min-width: 900px) {
    width: initial;
    display: initial;
  }
`;

const PreviewWrapper = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ShareButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: ${(props) => (props.isDisabled ? "none" : "all")};
  font-size: 1.8rem;
  width: 4rem;
  height: 4rem;
  text-align: center;
  border-radius: 0;
  background-color: #212121;
  border: none;
  color: white;
  box-shadow: none;
  font-family: "IBM Plex Sans", sans-serif;
  text-decoration: none;
  cursor: pointer;
  margin: 0 1rem;

  &:hover {
    background-color: #151515;
  }
`;

const SwitchContainer = styled.div`
  position: absolute !important;
  bottom: 0;
  align-self: center;
  display: flex;
  flex-direction: row !important;
  justify-content: center;
  align-items: center;
`;

const Switch = styled.button`
  margin: 0 0.5rem;
  width: 2rem;
  height: 2rem;
  border: 2px solid #b9b9b9;
  border-radius: 0.33rem;
  transition: 0.3s ease all;
  background-color: ${(props) =>
    props.isActive === props.size ? "#b9b9b9" : "transparent"};

  &:last-child {
    height: 1.5rem;
    width: 2.4rem;
  }

  &:focus {
    outline: 0px;
  }
`;

export default function PreviewContainer({ imagePosition }) {
  const {
    imageUrl,
    isGenerating,
    generatedAvatar,
    previewSize,
    setSize,
  } = useAppState();

  const changePreview = (size) => {
    if (size === "rect") {
      setSize("rect");
    } else {
      setSize("square");
    }
  };

  return (
    <Fragment>
      <Row imageUrl={imageUrl}>
        <Col>
          <PreviewWrapper isDisabled={isGenerating ? true : false}>
            <Preview
              size={previewSize}
              imageUrl={imageUrl && imagePosition(previewSize, imageUrl)}
            />

            <ButtonContainer>
              <FacebookProvider appId="213609442945784">
                <Share href="http://www.facebook.com">
                  {({ handleClick, loading }) => (
                    <ShareButton
                      disabled={loading}
                      onClick={handleClick}
                      isDisabled={isGenerating ? true : false}>
                      {isGenerating ? (
                        <Spinner small />
                      ) : (
                        <FontAwesomeIcon icon={faFacebookF} />
                      )}
                    </ShareButton>
                  )}
                </Share>
              </FacebookProvider>

              <ShareButton
                target="_blank"
                href={generatedAvatar && generatedAvatar[previewSize]}
                isDisabled={isGenerating ? true : false}>
                {isGenerating ? (
                  <Spinner small />
                ) : (
                  <FontAwesomeIcon icon={faTwitter} />
                )}
              </ShareButton>
              <ShareButton
                target="_blank"
                href={generatedAvatar && generatedAvatar[previewSize]}
                isDisabled={isGenerating ? true : false}>
                {isGenerating ? (
                  <Spinner small />
                ) : (
                  <FontAwesomeIcon icon={faInstagram} />
                )}
              </ShareButton>
            </ButtonContainer>
          </PreviewWrapper>
        </Col>
      </Row>
    </Fragment>
  );
}
