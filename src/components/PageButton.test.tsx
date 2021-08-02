/* eslint-disable @typescript-eslint/no-empty-function */
import PageButton from "./PageButton";
import { render } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";

// --------------------- Right button Tests ---------------------
it("render right button", () => {
  const { queryByTitle } = render(
    <PageButton
      direction={"right"}
      displayButton={"test"}
      onClick={() => {}}
    ></PageButton>
  );
  const div = queryByTitle("div");
  const rightButton = queryByTitle("right");
  expect(rightButton).toBeTruthy();
  expect(div).toBeTruthy();
});

it("onClick right page button", () => {
  const onClick = jest.fn();
  const { getByTitle } = render(
    <PageButton
      direction={"right"}
      displayButton={"test"}
      onClick={onClick}
    ></PageButton>
  );
  const rightButton = getByTitle("right");
  userEvent.click(rightButton);
  expect(onClick).toHaveBeenCalledTimes(1);
});

it("right button doesn't render when null displayButton is null", () => {
  const { queryByTitle } = render(
    <PageButton
      direction={"right"}
      displayButton={null}
      onClick={() => {}}
    ></PageButton>
  );
  const div = queryByTitle("div");
  const leftButton = queryByTitle("right");
  expect(div).toBeTruthy();
  expect(leftButton).not.toBeTruthy();
});

// --------------------- Left button Tests ---------------------
it("render left button", () => {
  const { queryByTitle } = render(
    <PageButton
      direction={"left"}
      displayButton={"test"}
      onClick={() => {}}
    ></PageButton>
  );
  const div = queryByTitle("div");
  const leftButton = queryByTitle("left");
  expect(leftButton).toBeTruthy();
  expect(div).toBeTruthy();
});

it("onClick left page button", () => {
  const onClick = jest.fn();
  const { getByTitle } = render(
    <PageButton
      direction={"left"}
      displayButton={"test"}
      onClick={onClick}
    ></PageButton>
  );
  const leftButton = getByTitle("left");
  userEvent.click(leftButton);
  expect(onClick).toHaveBeenCalledTimes(1);
});

it("left button doesn't render when null displayButton is null", () => {
  const { queryByTitle } = render(
    <PageButton
      direction={"left"}
      displayButton={null}
      onClick={() => {}}
    ></PageButton>
  );
  const div = queryByTitle("div");
  const leftButton = queryByTitle("left");
  expect(div).toBeTruthy();
  expect(leftButton).not.toBeTruthy();
});
