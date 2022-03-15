import { render, RenderOptions, RenderResult } from "@testing-library/react";
import React, { FC, ReactElement } from "react";
import SearchContextProvider from "../contexts/SearchContext";

const searchContext = {
  searchValue: "",
  pageInfo: {
    currentPage: 1,
    maxPageNumber: 10,
  },
};

const SearchProvider: FC = ({ children }) => {
  const setSearchValue = jest.fn();
  const setPageInfo = jest.fn();
  return (
    <SearchContextProvider
      initialValues={{
        ...searchContext,
        setSearchValue: setSearchValue,
        setPageInfo: setPageInfo,
      }}
    >
      {children}
    </SearchContextProvider>
  );
};

export const searchProviderRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
): RenderResult => render(ui, { wrapper: SearchProvider, ...options });
