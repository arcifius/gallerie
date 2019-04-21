import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { withRouter } from "react-router-dom";
import useDimensions from "react-use-dimensions";
import BackButton from "components/BackButton";
import ImageUploader from "components/ImageUploader";
import { WindowContext } from "contexts";

import "styles/components/Upload.scss";
import { Dimmer, Loader } from "semantic-ui-react";

function UploadPage(props) {
  const [uploading, setUploading] = useState(false);
  const [ref, { width, height }] = useDimensions();

  async function performUpload(images) {
    setUploading(true);

    try {
      const response = await axios.post(`http://localhost:3005/upload`, {
        images
      });

      if (response.status === 200) {
        props.history.push(`/`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <WindowContext.Provider value={{ width: width || 0, height: height || 0 }}>
      <div className="Upload" ref={ref}>
        <Dimmer active={uploading}>
          <Loader>Uploading images to Gallerie, hold on (:</Loader>
        </Dimmer>

        <BackButton target={`/`} />

        <ImageUploader onUpload={performUpload} />
      </div>
    </WindowContext.Provider>
  );
}

UploadPage.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(UploadPage);
