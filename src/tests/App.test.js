import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { fireEvent, cleanup, render } from "react-testing-library";
import App from "../App";
import Gallery from "pages/Gallery";

afterEach(cleanup);

function renderWithRouter(
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history
  };
}

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("full app rendering/navigating", () => {
  const { container, getByText, rerender } = renderWithRouter(<App />);
  expect(container.innerHTML).toMatch("Loading gallerie");

  /*
  const leftClick = { button: 0 };
  fireEvent.click(getByText(/about/i), leftClick);
  // Normally I'd use a data-testid, but just wanted to show this is also possible
  expect(container.innerHTML).toMatch("You are on the about page");
  */
});
