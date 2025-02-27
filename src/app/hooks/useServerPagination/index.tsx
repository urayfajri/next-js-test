import React from 'react';

export type SSRQueryKey = {
  pageSize: number;
  pageIndex: number;
  pageSearch: PageSearchType;
  pageSort: PageSortType;
};

export type PageSortType = {
  value: string;
  type: 'ascending' | 'descending' | 'none';
};

export type PageSearchType = {
  value: string;
  key: string;
};

/**
 * @type used to pass search option into table
 * @example 
 * const searchOption: PageSearchOptionType[] = [
    { value: 'user.nisn', title: 'NISN siswa' },
    { value: 'school.npsn', title: 'NPSN sekolah' },
  ];
 */
export type PageSearchOptionType = {
  value: string;
  title: string;
};

/**
 * Custom hooks to bind data from SSR Table
 * @param initialPageIndex : inital page in the table
 * @param initialPageSize : initial data count in every page
 * @param initialPageSearch : initial search query
 * @param intialPageSort : intial sort data
 *
 * @returns queryKey : object store all query data
 * (pageSize, pageIndex, pageSearch)
 *
 * @returns setQueryState : object with custom hooks to bind query data
 *
 * @example call
 * const { queryKey, setQueryState } = useServerPaginationTable(
    0,
    10,
    {
      value: '',
      key: searchOption[0].value,
    },
    {
      value: 'created_at',
      type: 'ascending',
    }
  );
 */
export default function useServerPaginationTable(
  initialPageIndex: number,
  initialPageSize: number,
  initialPageSearch: PageSearchType,
  intialPageSort: PageSortType
) {
  const [queryPageIndex, setQueryPageIndex] = React.useState(initialPageIndex);
  const [queryPageSize, setQueryPageSize] = React.useState(initialPageSize);
  const [queryPageSearch, setQuerySearch] = React.useState(initialPageSearch);
  const [queryPageSort, setQuerySort] = React.useState(intialPageSort);

  const queryKey: SSRQueryKey = {
    pageSize: queryPageSize,
    pageIndex: queryPageIndex,
    pageSearch: queryPageSearch,
    pageSort: queryPageSort,
  };

  return {
    queryKey,
    setQueryState: {
      setQueryPageIndex,
      setQueryPageSize,
      setQuerySearch,
      setQuerySort,
    },
  } as const;
}
