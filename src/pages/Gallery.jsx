import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "styles/components/Gallery.scss";
import { Button } from "semantic-ui-react";

function GalleryPage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetch() {
      const response = await axios.get(`http://localhost:3005/uploaded`);
      setImages(response.data);
    }

    if (images.length === 0) {
      fetch();
    }
  }, []);

  return (
    <div className="Gallery">
      <Button
        as={Link}
        className="new-image"
        to="/new"
        label="Click here to add more"
        icon="plus"
        color="blue"
      />

      <div className="board">
        {images.map(image => (
          <img key={image} alt="gallerie" src={image} />
        ))}
      </div>

      {images.length > 3 && (
        <Button
          as={Link}
          className="new-image"
          to="/new"
          label="Click here to add more"
          icon="plus"
          color="blue"
        />
      )}
    </div>
  );
}

export default React.memo(GalleryPage);
