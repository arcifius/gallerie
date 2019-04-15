import React from "react";
import { Link } from "react-router-dom";

import "styles/components/Gallery.scss";

export default function GalleryPage() {
  return (
    <div className="Gallery">
      <Link className="new-image" to="/new">
        Click here to add more!
      </Link>

      <div className="board">
        <span>See uploaded here</span>
      </div>
    </div>
  );
}
