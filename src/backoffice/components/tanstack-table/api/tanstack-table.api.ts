import { fetchAxios } from '@/lib/fetchAxios';

export const getDataTable = async ({
  currentPage,
  debouncedSearchTerm,
  pageSize,
  sortBy,
  sortOrder,
  apiUrl,
  type,
}: {
  currentPage: number;
  pageSize: number;
  debouncedSearchTerm: string;
  sortBy: string;
  sortOrder: 'desc' | 'asc';
  apiUrl: string;
  type?: string;
}) => {
  return await fetchAxios({
    method: 'GET',
    url: `${apiUrl}?page=${currentPage}&perPage=${pageSize}&search=${debouncedSearchTerm}&sortBy=${sortBy}&sortOrder=${sortOrder}&type=${type}`,
  });
};
