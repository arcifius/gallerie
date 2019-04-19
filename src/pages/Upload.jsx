import React from "react";
import axios from "axios";
import BackButton from "components/BackButton";
import ImageUploader from "components/ImageUploader";

import "styles/components/Upload.scss";

export default function UploadPage() {
  async function performUpload(images) {
    try {
      const response = await axios.post(`http://localhost:3005/upload`, {
        images
      });

      if (response.status === 200) {
        console.log(`uploaded!`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="Upload">
      <BackButton target={`/`} />

      <ImageUploader onUpload={performUpload} />
    </div>
  );
}
