import React from "react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";

function Uploader({ onDrop }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps({ onDrop })}>
      <input {...getInputProps({ accept: [`image/jpg`, `image/png`] })} />
      {isDragActive ? (
        <p>Drop the image here</p>
      ) : (
        <p>Drag and drop images here or click to select multiple images</p>
      )}
    </div>
  );
}

Uploader.propTypes = {
  onDrop: PropTypes.func.isRequired
};

export default Uploader;
