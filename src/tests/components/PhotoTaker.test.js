import React from "react";
import ReactDOM from "react-dom";
import PhotoTaker from "components/PhotoTaker";
import { fireEvent, render, cleanup } from "react-testing-library";

describe("PhotoTaker", () => {
  let stream;

  beforeEach(() => {
    stream = {};
  });

  afterEach(cleanup);

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <PhotoTaker cameraStream={stream} onPhotoTaken={jest.fn()} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("takes a photo when requested", () => {
    const onPhotoTaken = jest.fn();
    const ui = <PhotoTaker cameraStream={stream} onPhotoTaken={onPhotoTaken} />;
    const { container } = render(ui);

    const takePictureButton = container.querySelector("button");
    fireEvent.click(takePictureButton);

    expect(onPhotoTaken).toHaveBeenCalledTimes(1);
  });
});
