import React, { useCallback, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Dimmer, Loader, Button } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import PhotoTaker from "components/PhotoTaker";
import { WindowContext } from "contexts";

import "styles/components/ImageUploader.scss";

function ImageUploader(props) {
  const [images, setImages] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [stream, setStream] = useState(null);
  const windowContext = useContext(WindowContext);

  useEffect(() => {
    if (windowContext.width > 960) {
      setStream(null);
    }
  }, [windowContext.width]);

  function parseImage(image) {
    return new Promise(resolve => {
      const reader = new FileReader();

      reader.onload = e => {
        resolve({
          name: image.name,
          data: reader.result
        });
      };

      reader.readAsDataURL(image);
    });
  }

  const onDrop = useCallback(async acceptedImages => {
    setUpdating(true);
    setStream(null);

    const images = await Promise.all(
      acceptedImages.map(image => parseImage(image))
    );

    setImages(images);
    setUpdating(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  function takePhoto(ev) {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(function(cameraStream) {
        setStream(cameraStream);
        setImages([]);
      })
      .catch(function(err) {
        console.log("An error occured! " + err);
      });
  }

  function handleFreshPhoto(photo) {
    setImages([
      {
        name: `camera-${new Date().getTime()}`,
        data: photo
      }
    ]);
  }

  return (
    <div className="ImageUploader">
      {windowContext.width < 960 ? (
        <Button.Group vertical={windowContext.width <= 320}>
          <Button color="blue" {...getRootProps({ onDrop })}>
            <input {...getInputProps({ accept: [`image/jpg`, `image/png`] })} />
            Select photos from device
          </Button>
          <Button.Or />
          <Button onClick={takePhoto} color="blue">
            Take a fresh photo
          </Button>
        </Button.Group>
      ) : (
        <div {...getRootProps({ onDrop })} className="ImageUploader-dropzone">
          <input {...getInputProps({ accept: [`image/jpg`, `image/png`] })} />
          {isDragActive ? (
            <p>Drop the image here</p>
          ) : (
            <p>Drag and drop images here or click to select multiple images</p>
          )}
        </div>
      )}

      {stream && (
        <PhotoTaker cameraStream={stream} onPhotoTaken={handleFreshPhoto} />
      )}

      <div className="ImageUploader-preview">
        {!updating ? (
          images.map(image => (
            <img key={image.name} alt={image.name} src={image.data} />
          ))
        ) : (
          <Dimmer active>
            <Loader>Reading images</Loader>
          </Dimmer>
        )}
      </div>

      {images.length > 0 && (
        <div className="ImageUploader-actions">
          <Button
            icon="upload"
            label="Send images"
            color="green"
            onClick={() => props.onUpload(images)}
          />
        </div>
      )}
    </div>
  );
}

ImageUploader.propTypes = {
  onUpload: PropTypes.func.isRequired
};

export default ImageUploader;
