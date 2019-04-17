import React, { useState } from "react";
import BackButton from "components/BackButton";
import ImageUploader from "components/ImageUploader";

import "styles/components/Upload.scss";

export default function UploadPage() {
  const [images, setImages] = useState();

  function imagesDroppedIn(images) {
    console.log(images);
  }

  return (
    <div className="Upload">
      <BackButton target={`/`} />

      <ImageUploader onDrop={imagesDroppedIn} />
    </div>
  );
}
