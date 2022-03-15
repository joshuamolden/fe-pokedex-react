import PageButton from "../PageButton/PageButton";
import { render } from "@testing-library/react";
import React from "react";
import { searchProviderRender } from "../../testUtils/renderWrapper";

// --------------------- Right button Tests ---------------------
it("render right button", () => {
  const { queryByTitle } = searchProviderRender(
    <PageButton direction={false} />
  );
  const rightButton = queryByTitle("right");
  expect(rightButton).toBeTruthy();
});

// --------------------- Left button Tests ---------------------
it("render left button", () => {
  const { queryByTitle } = searchProviderRender(
    <PageButton direction={true} />
  );
  const leftButton = queryByTitle("left");
  expect(leftButton).toBeTruthy();
});
