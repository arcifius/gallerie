import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";

import "styles/components/PhotoTaker.scss";

function PhotoTaker(props) {
  const camera = useRef(null);

  useEffect(() => {
    camera.current.srcObject = props.cameraStream;
  }, [props.cameraStream]);

  function takePhoto() {
    const canvas = document.createElement(`canvas`);

    const context = canvas.getContext(`2d`);
    canvas.width = camera.current.getBoundingClientRect().width;
    canvas.height = camera.current.getBoundingClientRect().height;
    context.drawImage(camera.current, 0, 0, canvas.width, canvas.height);

    props.onPhotoTaken(canvas.toDataURL("image/png"));
  }

  return (
    <div className="PhotoTaker">
      <div className="PhotoTaker-preview">
        <video ref={camera} muted autoPlay />

        <div className="PhotoTaker-actions">
          <Button icon="camera" color="blue" circular onClick={takePhoto} />
        </div>
      </div>
    </div>
  );
}

PhotoTaker.propTypes = {
  cameraStream: PropTypes.object.isRequired,
  onPhotoTaken: PropTypes.func.isRequired
};

export default PhotoTaker;
