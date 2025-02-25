'use client';

import React, { useEffect, useState } from 'react';
import { ITanstackTable } from './tanstackTable.type';
import TanstackTableView from './TanstackTable.view';
import { debounce } from '@/utils/debounce';
import { useQuery } from '@tanstack/react-query';
import { getDataTable } from './api/tanstack-table.api';
import { HydrationBoundary } from '@tanstack/react-query'

/**
 * TanstackTable component to display data in a table format with support for
 * search, sorting, and pagination.
 *
 * @template T - The data type displayed in the table.
 *
 * @param {Object} props - Properties for this component.
 * @param {string} props.apiUrl - The API URL to fetch table data.
 * @param {Column<T>[]} props.columns - Column definitions for the table.
 * @param {number[]} [props.pageSizeOptions] - Options for the number of items displayed per page (default: [10, 20, 30, 40, 50]).
 * @param {React.ReactNode} [props.children] - Optional children to render next to the search bar.
 * @param {() => void} props.onRefresh - Function to trigger a refresh of the table data.
 */
const TanstackTable = <T,>({
  apiUrl,
  columns,
  pageSizeOptions = [15],
  children,
  onRefresh,
  isDarkMode,
  showSearch,
  type,
  indexField = true,
  initialData,
  dehydratedState,
}: ITanstackTable<T>) => {
  // State declarations
  const [data, setData] = useState<T[]>([]);
  const [totalPages, setTotalPages] = useState(() => initialData?.data?.meta?.lastPage || 1);
  const [totalData, setTotalData] = useState(() => initialData?.data?.meta?.total || 0);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => {
    if (initialData?.data?.meta?.currentPage) {
      return initialData.data.meta.currentPage;
    }
    return 1;
  });

  const queryData = useQuery({
    queryKey: [
      'tanstack-table',
      currentPage,
      pageSize,
      debouncedSearchTerm,
      sortBy,
      sortOrder,
      apiUrl,
      type,
    ],
    queryFn: () =>
      getDataTable({
        apiUrl,
        currentPage,
        debouncedSearchTerm,
        pageSize,
        sortBy,
        sortOrder,
        type,
      }),
    initialData: currentPage === 1 ? initialData : undefined, // Only use initialData for first page
    refetchOnMount: currentPage !== 1, // Refetch if not on first page
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (queryData.isError) {
      console.error(queryData.error);
    }
    if (queryData.isLoading) setIsLoading(true)
    if (!queryData.isLoading && queryData.data) {
      const paginatedData = queryData.data?.data;
      setData(paginatedData.items);
      setTotalPages(paginatedData.meta.lastPage);
      setTotalData(paginatedData.meta.total);
      setCurrentPage(paginatedData.meta.currentPage);
      setIsLoading(false);
    }
  }, [JSON.stringify(queryData)]);

  // Debounced search term update
  useEffect(() => {
    const debouncedFunction = debounce(() => {
      setCurrentPage(1);
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    debouncedFunction.debounced();

    return () => {
      debouncedFunction.cancel();
    };
  }, [searchTerm]);

  // Sorting handler
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Pagination handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className={`${isDarkMode ? 'dark' : ''}`}>
        <div className="">
          <TanstackTableView<T>
            data={data}
            columns={columns}
            currentPage={currentPage}
            totalPages={totalPages}
            totalData={totalData}
            pageSize={pageSize}
            pageSizeOptions={pageSizeOptions}
            searchTerm={searchTerm}
            sortBy={sortBy}
            sortOrder={sortOrder}
            setSearchTerm={setSearchTerm}
            setPageSize={setPageSize}
            handleSort={handleSort}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
            isLoading={isLoading}
            isDarkMode={isDarkMode}
            showSearch={showSearch}
            indexField={indexField}
            initialData={initialData}
          >
            {children}
          </TanstackTableView>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default TanstackTable;
