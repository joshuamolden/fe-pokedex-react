import Header from "../Header/Header";
import { render } from "@testing-library/react";
import React from "react";

it("check if h1", () => {
  const { queryByTitle } = render(<Header></Header>);
  const h1 = queryByTitle("header");
  expect(h1).toBeTruthy();
});
