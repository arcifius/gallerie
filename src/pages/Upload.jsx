import React from "react";
import BackButton from "components/BackButton";
import Uploader from "components/Uploader";

import "styles/components/Upload.scss";

export default function UploadPage() {
  function imagesDroppedIn(images) {
    console.log(images);
  }

  return (
    <div className="Upload">
      <BackButton target={`/`} />

      <Uploader onDrop={imagesDroppedIn} />
    </div>
  );
}
