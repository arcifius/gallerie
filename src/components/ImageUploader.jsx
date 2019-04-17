import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";

function ImageUploader(props) {
  const [images, setImages] = useState([]);

  function parseImage(image) {
    return new Promise(resolve => {
      const reader = new FileReader();

      reader.onload = e => {
        const result = {
          name: image.name,
          data: reader.result
        };

        images.push(result);
        resolve(result);
        setImmediate(() => {
          setImages(images);
        });
      };

      reader.readAsDataURL(image);
    });
  }

  const onDrop = useCallback(acceptedImages => {
    acceptedImages.map(image => parseImage(image));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps({ onDrop })}>
      <input {...getInputProps({ accept: [`image/jpg`, `image/png`] })} />
      {isDragActive ? (
        <p>Drop the image here</p>
      ) : (
        <p>Drag and drop images here or click to select multiple images</p>
      )}

      <div>
        {images.map(image => (
          <img key={image.name} alt={image.name} src={image.data} />
        ))}
      </div>
    </div>
  );
}

ImageUploader.propTypes = {};

export default ImageUploader;
