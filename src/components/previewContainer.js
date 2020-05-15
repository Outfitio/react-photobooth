import React, { Fragment } from "react";
import styled from "styled-components";
import Preview from "./preview.js";
import { useAppState } from "../providers/appState";
import GeneratingTag from "./generatingTag";

const Row = styled.div`
  width: 100%;
  display: ${(props) => (props.isMobile ? "flex" : "none")};
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  filter: ${(props) => (props.imageUrl ? "blur(0)" : "blur(5px)")};
  transition: cubic-bezier(0.68, 0.03, 0.86, 0.96) filter 0.8s;

  @media (min-width: 900px) {
    flex-direction: row;
    display: ${(props) => (props.isMobile ? "none" : "flex")};
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

const PreviewWrapper = styled.div`
  a {
    display: block;
    opacity: 1;
    transition: 0.2s cubic-bezier(0.42, 0, 0.88, 0.84) opacity;
    font-size: 1rem;
    align-self: center;

    @media (min-width: 900px) {
      font-size: 1.5rem;
      display: ${(props) => (props.isDisabled ? "block" : "none")};
      opacity: ${(props) => (props.isDisabled ? "1" : "0")};
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.5);
    }
  }

  div {
    transition: 0.2s cubic-bezier(0.42, 0, 0.88, 0.84) all;
    transform: scale(1);
  }

  &:hover div {
    transform: scale(1.025);
  }

  &:hover a {
    display: block;
    opacity: 1;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row !important;
  justify-content: space-between;
`;

const DownloadButton = styled.a`
  display: block;
  pointer-events: ${(props) => (props.isDisabled ? "none" : "all")};
  padding: 0.6rem 1.2rem;
  border-radius: 0.3em;
  background-color: #326295;
  border: none;
  color: white;
  box-shadow: none;
  font-family: "IBM Plex Sans", sans-serif;
  text-decoration: none;
  cursor: pointer;
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
              size="square"
              imageUrl={imageUrl && imagePosition("square", imageUrl)}
            />
            {generatedAvatar && (
              <DownloadButton target="_blank" href={generatedAvatar.square}>
                Download
              </DownloadButton>
            )}
          </PreviewWrapper>
          <TextContainer>
            <p>Instagram</p>
            {imageUrl && <GeneratingTag />}
          </TextContainer>
        </Col>
        <Col>
          <PreviewWrapper isDisabled={isGenerating ? true : false}>
            <Preview
              size="rect"
              imageUrl={imageUrl && imagePosition("rect", imageUrl)}
            />
            {generatedAvatar && (
              <DownloadButton target="_blank" href={generatedAvatar.rect}>
                Download
              </DownloadButton>
            )}
          </PreviewWrapper>
          <TextContainer>
            <p>Facebook, Linkedin, Twitter</p>
            {imageUrl && <GeneratingTag />}
          </TextContainer>
        </Col>
      </Row>
      <Row isMobile imageUrl={imageUrl}>
        <Col>
          <PreviewWrapper isDisabled={isGenerating ? true : false}>
            <p>
              {previewSize === "square"
                ? "Instagram"
                : "Facebook, Linkedin, Twitter"}
            </p>

            <Preview
              size={previewSize}
              imageUrl={imageUrl && imagePosition(previewSize, imageUrl)}
            />
            <DownloadButton
              component="a"
              target="_blank"
              href={generatedAvatar && generatedAvatar[previewSize]}
              isDisabled={isGenerating ? true : false}>
              {isGenerating ? "Generating..." : "Download"}
            </DownloadButton>
          </PreviewWrapper>
          <SwitchContainer>
            <Switch
              isActive={previewSize}
              size="square"
              onClick={function () {
                changePreview("square");
              }}
            />
            <Switch
              isActive={previewSize}
              size="rect"
              onClick={function () {
                changePreview("rect");
              }}
            />
          </SwitchContainer>
        </Col>
      </Row>
    </Fragment>
  );
}
