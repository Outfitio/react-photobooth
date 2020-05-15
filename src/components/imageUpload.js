import React, { Fragment } from "react";
import styled from "styled-components";
import axios from "axios";
import EXIF from "exif-js";
import Spinner from "../components/spinner";
import { useAppState } from "../providers/appState";

const Uploader = styled.div`
  display: flex;
  justify-content: center;

  input {
    height: 0;
    overflow: hidden;
    width: 0;
  }

  input + label {
    position: relative;
    transition: 0.3s ease background-color;
    text-align: center;
    font-size: 1.5rem;
    width: 16rem;
    justify-content: center;
    font-weight: 500;
    padding: 0.4em 1em;
    color: #fff;
    background-color: ${(props) => (props.disabled ? "#BB003A" : "#E40046")};
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    display: inline-block;
    border-radius: 0.33rem;
    border: 1px solid transparent;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    overflow: hidden;

    span.upload {
      display: inline-block;
      height: 100%;
      transition: all 0.3s;
      width: 100%;
      transform: ${(props) => props.disabled && "translateY(300%)"};
    }

    span.uploading {
      height: 100%;
      left: 0;
      position: absolute;
      line-height: 3.5rem;
      top: ${(props) => (props.disabled ? "0" : "-180%")};
      transition: all 0.3s;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      @media (min-width: 900px) {
        line-height: 4.4rem;
      }
    }

    @media (min-width: 900px) {
      font-size: 2rem;
      width: 22rem;
    }

    &:hover {
      background-color: ${(props) => (props.disabled ? "#E40046" : "#BB003A")};
      color: #fff;
      border: 1px solid ${(props) => (props.disabled ? "#E40046" : "#BB003A")};
    }
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${(props) => props.progressIncrement}%;
  transition: all ease 0.8s;
  background-color: ${(props) =>
    props.imageUrl ? "transparent" : "rgba(0, 0, 0, 0.2)"};
  z-index: -1;
  pointer-events: none;
`;

const StyledSpinner = styled(Spinner)`
  margin-left: 1rem;
`;

export default function PhotosUploader({ label }) {
  const {
    imageUrl,
    setImageUrl,
    isUploading,
    setIsUploading,
    progressIncrement,
    setProgress,
    cloudinaryUploadPreset,
    cloudinaryCloudName,
  } = useAppState();

  const getBase64Image = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    var exifOrientation = "";

    EXIF.getData(file, function () {
      var exifData = EXIF.pretty(this);
      if (exifData) {
        // console.log(EXIF.getTag(this, 'Orientation'))
        exifOrientation = EXIF.getTag(this, "Orientation");
      } else {
        // console.log("No EXIF data found in image '" + file.name + "'.")
      }
    });

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        var width = "";
        var height = "";
        var transform = "";

        if (exifOrientation === 8) {
          width = img.height;
          height = img.width;
          transform = "left";
        } else if (exifOrientation === 6) {
          width = img.height;
          height = img.width;
          transform = "right";
        } else {
          width = img.width;
          height = img.height;
        }

        var MAX_WIDTH = 1600;
        var MAX_HEIGHT = 1600;
        if (width / MAX_WIDTH > height / MAX_HEIGHT) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");

        canvas.width = width;
        canvas.height = height;

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 700, 600);
        if (transform === "left") {
          ctx.setTransform(0, -1, 1, 0, 0, height);
          ctx.drawImage(img, 0, 0, height, width);
        } else if (transform === "right") {
          ctx.setTransform(0, 1, -1, 0, width, 0);
          ctx.drawImage(img, 0, 0, height, width);
        } else if (transform === "flip") {
          ctx.setTransform(1, 0, 0, -1, 0, height);
          ctx.drawImage(img, 0, 0, width, height);
        } else {
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.drawImage(img, 0, 0, width, height);
        }
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        const data = ctx.canvas.toDataURL("image/jpeg");
        callback(data);
      };
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const onInputChange = (event) => {
    setIsUploading(true);

    for (const file of event.target.files) {
      // Check out src/providers/appState.js to enter the keys
      const uploadPreset = cloudinaryUploadPreset;
      const cloudName = cloudinaryCloudName;
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

      getBase64Image(file, (base64Value) => {
        const data = {
          upload_preset: uploadPreset,
          file: base64Value,
        };

        const config = {
          onUploadProgress: function (progressEvent) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(progress);
          },
        };

        axios
          .post(url, data, config)
          .then((response) => {
            setIsUploading(false);
            setImageUrl(response.data.url);
          })

          .catch((error) => {
            console.log(error);
            setIsUploading(false);
          });
      });
    }
  };

  return (
    <Fragment>
      {!imageUrl && (
        <Uploader isUploading={isUploading} disabled={isUploading}>
          <input
            type="file"
            id="fileupload"
            accept="image/*"
            onChange={onInputChange}
            title="Upload your Photo"
            disabled={isUploading}
          />
          <label htmlFor="fileupload">
            <span className="upload">{label}</span>
            <span className="uploading">
              Uploading <StyledSpinner />
            </span>
          </label>
        </Uploader>
      )}

      {progressIncrement && (
        <ProgressBar
          imageUrl={imageUrl}
          progressIncrement={progressIncrement}></ProgressBar>
      )}
    </Fragment>
  );
}
