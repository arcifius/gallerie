import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup, waitForElement } from "react-testing-library";
import { MemoryRouter } from "react-router-dom";
import * as axios from "axios";
import GalleryPage from "pages/Gallery";

jest.mock("axios");

describe("Gallery page", () => {
  afterEach(cleanup);

  beforeEach(() => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: [
          "http://testing.com/uploaded/cat.jpg",
          "http://testing.com/uploaded/dog.jpg"
        ]
      })
    );
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter initialEntries={["/"]}>
        <GalleryPage />
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders uploaded images", async () => {
    const ui = (
      <MemoryRouter initialEntries={["/"]}>
        <GalleryPage />
      </MemoryRouter>
    );
    const { container } = render(ui);

    await waitForElement(() => container.querySelector("img"));

    const uploadedImages = container.querySelectorAll("img");
    expect(uploadedImages).toHaveLength(2);
  });

  it("renders one add button if we have 3 or less images", async () => {
    const ui = (
      <MemoryRouter initialEntries={["/"]}>
        <GalleryPage />
      </MemoryRouter>
    );
    const { container } = render(ui);

    await waitForElement(() => container.querySelector("img"));

    const addButtons = container.querySelectorAll("button");
    expect(addButtons).toHaveLength(1);
  });

  it("renders two add button if we have 3 or more images", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: [
          "http://testing.com/uploaded/cat.jpg",
          "http://testing.com/uploaded/dog.jpg",
          "http://testing.com/uploaded/bird.jpg",
          "http://testing.com/uploaded/aardvark.jpg"
        ]
      })
    );

    const ui = (
      <MemoryRouter initialEntries={["/"]}>
        <GalleryPage />
      </MemoryRouter>
    );
    const { container } = render(ui);

    await waitForElement(() => container.querySelector("img"));

    const addButtons = container.querySelectorAll("button");
    expect(addButtons).toHaveLength(2);
  });
});
