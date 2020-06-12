import React, { useEffect, Fragment } from "react";
import { useAppState } from "./providers/appState";
import { isMobile } from "react-device-detect";
import axios from "axios";
import update from "immutability-helper";
import styled from "styled-components";
import PhotosUploader from "./components/imageUpload";
import PreviewContainer from "./components/previewContainer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndoAlt } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  font-family: "IBM Plex Sans", sans-serif;
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #000;
  color: #fff;
`;

const InnerContainer = styled.div`
  width: 100%;

  @media (min-width: 1280px) {
    width: 1280px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 4rem 24rem;
  position: relative;
  overflow: hidden;
  height: 90vh;
  display: flex;

  @media (min-width: 500px) {
    padding: 2rem 8rem;
  }

  @media (min-width: 700px) {
    padding: 2rem 13rem;
    height: 75vh;
  }

  @media (min-width: 900px) {
    padding: 4rem 24rem;
    height: auto;
  }
`;

const OverlaySection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  z-index: 1;
  pointer-events: ${(props) => (props.imageUrl ? "none" : "all")};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    text-transform: uppercase;
  }
`;

const StartAgainButton = styled.button`
  font-size: 1rem;
  justify-content: center;
  padding: 0.6rem 1.2rem;
  border-radius: 0.3em;
  background-color: #989898;
  border: none;
  color: white;
  box-shadow: none;
  font-family: "IBM Plex Sans", sans-serif;
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

function App() {
  const {
    imageUrl,
    setImageUrl,
    setProgress,
    setIsGenerating,
    setGeneratedAvatars,
  } = useAppState();

  const imagePosition = (size, url) => {
    const pathnameArray = new URL(url).href.split("/");
    const uploadPath = pathnameArray[5];

    const transformations =
      size === "square"
        ? "/w_900,h_900,c_thumb,g_face/w_900"
        : "/w_1320,h_691,c_crop,g_face/w_1000";

    const newPathArray = update(pathnameArray, {
      5: { $set: uploadPath + transformations },
    });

    return newPathArray.join("/");
  };

  const startAgain = () => {
    setImageUrl(null);
    setProgress(null);
    setGeneratedAvatars(null);
  };

  useEffect(() => {
    if (imageUrl !== null) {
      const generateAvatar = () => {
        setIsGenerating(true);

        const reqUrl =
          "https://6bf0aic5kj.execute-api.ap-southeast-2.amazonaws.com/anh/dynamic-exports";

        const rectData = {
          width: 1320,
          height: 691,
          fileType: "png",
          unit: "px",
          templateId: "redhat",
          downloadName: isMobile ? "" : "rectangle-summit-photobooth-by-outfit",
          templateProps: {
            avatar: imagePosition("rect", imageUrl),
          },
        };

        const squareData = {
          width: 1200,
          height: 1200,
          fileType: "png",
          unit: "px",
          templateId: "redhat",
          downloadName: isMobile ? "" : "square-summit-photobooth-by-outfit",
          templateProps: {
            avatar: imagePosition("square", imageUrl),
          },
        };

        const rectRequest = (data, url) => {
          return axios.post(url, data);
        };

        const squareRequest = (data, url) => {
          return axios.post(url, data);
        };

        axios
          .all([
            rectRequest(rectData, reqUrl),
            squareRequest(squareData, reqUrl),
          ])
          .then((response) => {
            const generatedAvatars = {
              rect: response[0].data.url,
              square: response[1].data.url,
            };
            setGeneratedAvatars(generatedAvatars);
            setIsGenerating(false);
          })
          .catch((error) => {
            console.log(error);
            setIsGenerating(false);
          });
      };
      generateAvatar();
    }
  }, [imageUrl]);

  return (
    <Fragment>
      <Container>
        <InnerContainer>
          <Header>
            <h1>We the People</h1>

            {imageUrl && (
              <StartAgainButton
                onClick={function () {
                  startAgain();
                }}>
                <FontAwesomeIcon icon={faUndoAlt} />
              </StartAgainButton>
            )}
          </Header>

          <Wrapper>
            <OverlaySection imageUrl={imageUrl}>
              <PhotosUploader label="Upload your Image" />
            </OverlaySection>

            <PreviewContainer imagePosition={imagePosition} />
          </Wrapper>
        </InnerContainer>
      </Container>
    </Fragment>
  );
}

export default App;
