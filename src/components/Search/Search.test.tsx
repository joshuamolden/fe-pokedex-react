/* eslint-disable @typescript-eslint/no-empty-function */
import Search from "../Search/Search";
import { render, cleanup } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

it("initial render", () => {
  const { queryByTitle } = render(
    <BrowserRouter>
      <Search />
    </BrowserRouter>
  );
  const container = queryByTitle("container");
  const input = queryByTitle("input");
  const clearButton = queryByTitle("clearButton");
  expect(container).toBeTruthy();
  expect(input).toBeTruthy();
  expect(clearButton).not.toBeTruthy();
});

it("disply clear button after text submitted", () => {
  const { getByTitle, queryByTitle } = render(
    <BrowserRouter>
      <Search />
    </BrowserRouter>
  );
  const input = getByTitle("input");
  let clearButton = queryByTitle("clearButton");
  expect(input).toBeTruthy();
  expect(clearButton).not.toBeTruthy();

  userEvent.type(input, "test");
  userEvent.keyboard("{Enter}");
  clearButton = queryByTitle("clearButton");
  expect(clearButton).toBeTruthy();
});

it("hide clear button after clear clicked", () => {
  const { getByTitle, queryByTitle } = render(
    <BrowserRouter>
      <Search />
    </BrowserRouter>
  );
  const input = getByTitle("input");
  let clearButton = queryByTitle("clearButton");
  expect(input).toBeTruthy();
  expect(clearButton).not.toBeTruthy();

  userEvent.type(input, "test");
  userEvent.keyboard("{Enter}");
  clearButton = getByTitle("clearButton");
  userEvent.click(clearButton);
  clearButton = queryByTitle("clearButton");
  expect(clearButton).not.toBeTruthy();
});
