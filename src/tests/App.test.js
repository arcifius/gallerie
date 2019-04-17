import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";

import Gallery from "pages/Gallery";
import Upload from "pages/Upload";
import NotFoundPage from "pages/NotFound";
import App from "App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("invalid path should redirect to 404", () => {
  const wrapper = mount(<App initialEntries={["/random"]} />);
  expect(wrapper.find(Gallery)).toHaveLength(0);
  expect(wrapper.find(NotFoundPage)).toHaveLength(1);
});

test("valid path should not redirect to 404", () => {
  const wrapper = mount(<App initialEntries={["/"]} />);
  expect(wrapper.find(Gallery)).toHaveLength(1);
  expect(wrapper.find(NotFoundPage)).toHaveLength(0);
});

test("navigation through App", () => {
  let wrapper = mount(<App initialEntries={["/"]} />);
  expect(wrapper.find(Gallery)).toHaveLength(1);

  wrapper = mount(<App initialEntries={["/new"]} />);
  expect(wrapper.find(Upload)).toHaveLength(1);
});
