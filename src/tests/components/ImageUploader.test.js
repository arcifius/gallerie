import React from "react";
import ReactDOM from "react-dom";
import ImageUploader from "components/ImageUploader";
import { fireEvent, render, cleanup } from "react-testing-library";

// This adds custom jest matchers from jest-dom
import "jest-dom/extend-expect";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ImageUploader onDrop={() => {}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("should invoke passed onDrop when the event occurs", () => {
  const file = new File([JSON.stringify({ ping: true })], "ping.json", {
    type: "application/json"
  });
  const data = mockData([file]);
  const onDrop = jest.fn();

  const ui = <ImageUploader onDrop={onDrop} />;
  const { container } = render(ui);
  const dropzone = container.querySelector("div");

  fireEvent.drop(dropzone, data);
  expect(onDrop).toHaveBeenCalled();
});

it("should show another message when drag is active", async () => {
  const file = new File([`randomicbinaries`], "image.png", {
    type: "image/png"
  });
  const data = mockData([file]);

  const ui = <ImageUploader onDrop={jest.fn()} />;
  const { container } = render(ui);
  const dropzone = container.querySelector("div");

  dispatchEvt(dropzone, "dragenter", data);
  await flushPromises(ui, container);
  expect(dropzone).toHaveTextContent("Drop the image here");
});

/**
 * Test helpers
 **/
function flushPromises(ui, container) {
  return new Promise(resolve =>
    setImmediate(() => {
      render(ui, { container });
      resolve(container);
    })
  );
}

function dispatchEvt(node, type, data) {
  const event = new Event(type, { bubbles: true });
  Object.assign(event, data);
  fireEvent(node, event);
}

function mockData(files) {
  return {
    dataTransfer: {
      files,
      items: files.map(file => ({
        kind: "file",
        type: file.type,
        getAsFile: () => file
      })),
      types: ["Files"]
    }
  };
}
