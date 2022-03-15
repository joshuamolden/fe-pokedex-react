import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

type PageInfo = {
  currentPage: number;
  maxPageNumber: number;
};

type SearchContextValue = {
  searchValue: string;
  pageInfo: PageInfo;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setPageInfo: Dispatch<SetStateAction<PageInfo>>;
};

const initialValue: SearchContextValue = {
  searchValue: "",
  pageInfo: {
    currentPage: 0,
    maxPageNumber: 0,
  },
  setSearchValue: () => {
    return;
  },
  setPageInfo: () => {
    return;
  },
};

const SearchContext = createContext<SearchContextValue>(initialValue);

const SearchContextProvider = ({
  children,
  initialValues = initialValue,
}: {
  children: ReactNode;
  initialValues?: SearchContextValue;
}): ReactElement => {
  const [searchValue, setSearchValue] = useState(
    initialValues?.searchValue ?? ""
  );
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    currentPage: initialValues?.pageInfo.currentPage,
    maxPageNumber: initialValues?.pageInfo.maxPageNumber,
  });

  const value = useMemo<SearchContextValue>(
    () => ({
      searchValue,
      pageInfo,
      setSearchValue,
      setPageInfo,
    }),
    [pageInfo, searchValue]
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export default SearchContextProvider;

export const useSearch = (): SearchContextValue => {
  const searchContext = useContext(SearchContext);
  return searchContext;
};
