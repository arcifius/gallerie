import React from "react";
import ReactDOM from "react-dom";
import ImageUploader from "components/ImageUploader";
import {
  fireEvent,
  render,
  cleanup,
  waitForElement
} from "react-testing-library";
import { WindowContext } from "contexts";

describe("ImageUploader", () => {
  let images;

  beforeEach(() => {
    images = [
      createFile("cats.png", 1234, "image/png"),
      createFile("dogs.png", 2345, "image/png")
    ];
  });

  afterEach(cleanup);

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <WindowContext.Provider value={{ width: 1920, height: 1080 }}>
        <ImageUploader onUpload={() => {}} />
      </WindowContext.Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("should update preview when images were picked", async () => {
    const ui = (
      <WindowContext.Provider value={{ width: 1920, height: 1080 }}>
        <ImageUploader onUpload={jest.fn()} />
      </WindowContext.Provider>
    );
    const { container, getByText } = render(ui);
    const input = container.querySelector("input");

    Object.defineProperty(input, "files", { value: images });

    // Simulate change with fake images
    dispatchEvt(input, "change");
    await flushPromises(ui, container);

    // Wait for UI update
    await waitForElement(() => getByText(/send images/i));

    const imgs = container.querySelectorAll("img");
    expect(imgs).toHaveLength(images.length);
  });

  it("should not show send button if no images were selected", async () => {
    const ui = (
      <WindowContext.Provider value={{ width: 1920, height: 1080 }}>
        <ImageUploader onUpload={jest.fn()} />
      </WindowContext.Provider>
    );
    const { container } = render(ui);
    const input = container.querySelector("input");

    Object.defineProperty(input, "files", { value: [] });

    // Simulate change with fake images
    dispatchEvt(input, "change");
    await flushPromises(ui, container);

    // Look for send button
    const sendButton = container.querySelector("button");
    expect(sendButton).toBeNull();

    const imgs = container.querySelectorAll("img");
    expect(imgs).toHaveLength(0);
  });

  it("should invoke onUpload when user requests it", async () => {
    const onUpload = jest.fn();
    const ui = (
      <WindowContext.Provider value={{ width: 1920, height: 1080 }}>
        <ImageUploader onUpload={onUpload} />
      </WindowContext.Provider>
    );
    const { container, getByText } = render(ui);
    const input = container.querySelector("input");

    Object.defineProperty(input, "files", { value: images });

    dispatchEvt(input, "change");
    await flushPromises(ui, container);

    const sendButton = await waitForElement(() => getByText(/send images/i));

    fireEvent.click(sendButton);
    expect(onUpload).toHaveBeenCalledTimes(1);
    expect(onUpload).toHaveBeenCalledWith(
      images.map(image => ({
        name: image.name,
        data: `data:image/png;base64,cmFuZG9taWNiYXNlNjRpbWFnZQ==`
      }))
    );
  });
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

function createFile(name, size, type) {
  const file = new File([`randomicbase64image`], name, { type });
  Object.defineProperty(file, "size", {
    get() {
      return size;
    }
  });
  return file;
}
