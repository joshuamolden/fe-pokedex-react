/* eslint-disable @typescript-eslint/no-empty-function */
import Search from "../Search/Search";
import { render, cleanup } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

it("initial render", () => {
  const onSearch = jest.fn();
  const onClear = jest.fn();

  const { queryByTitle } = render(
    <BrowserRouter>
      <Search onSearch={onSearch} onClear={onClear} />
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
  const onSearch = jest.fn();
  const onClear = jest.fn();

  const { getByTitle, queryByTitle } = render(
    <BrowserRouter>
      <Search onSearch={onSearch} onClear={onClear} />
    </BrowserRouter>
  );
  const input = getByTitle("input");
  let clearButton = queryByTitle("clearButton");
  expect(input).toBeTruthy();
  expect(clearButton).not.toBeTruthy();

  userEvent.type(input, "test");
  userEvent.keyboard("{Enter}");
  expect(onSearch).toHaveBeenCalledTimes(1);
  clearButton = queryByTitle("clearButton");
  expect(clearButton).toBeTruthy();
});

it("hide clear button after clear clicked", () => {
  const onSearch = jest.fn();
  const onClear = jest.fn();

  const { getByTitle, queryByTitle } = render(
    <BrowserRouter>
      <Search onSearch={onSearch} onClear={onClear} />
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
  expect(onClear).toHaveBeenCalledTimes(1);
  clearButton = queryByTitle("clearButton");
  expect(clearButton).not.toBeTruthy();
});
