import React from "react";
import ReactDOM from "react-dom";
import { cleanup } from "react-testing-library";
import { MemoryRouter } from "react-router-dom";
import * as axios from "axios";
import UploadPage from "pages/Upload";
import { WindowContext } from "contexts";

jest.mock("axios");

describe("Upload page", () => {
  afterEach(cleanup);

  beforeEach(() => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: {}
      })
    );
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <WindowContext.Provider value={{ width: 1920, height: 1080 }}>
        <MemoryRouter>
          <UploadPage />
        </MemoryRouter>
      </WindowContext.Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
