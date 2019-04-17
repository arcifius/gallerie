import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import BackButton from "components/BackButton";

test("when clicked, should move to the target page", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/new"]}>
      <BackButton target="/" />
    </MemoryRouter>
  );

  wrapper.find(BackButton).simulate("click");

  expect(window.location.pathname).toBe("/");
});
