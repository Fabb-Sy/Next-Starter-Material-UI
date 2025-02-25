import React, { useMemo } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ITanstackTableViewProps } from './tanstackTable.type';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  CircularProgress,
  Select,
  MenuItem,
  Typography,
  Box
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const TanstackTableView = <T,>({
  data,
  columns,
  currentPage,
  totalPages,
  totalData,
  pageSize,
  pageSizeOptions,
  searchTerm,
  sortBy,
  sortOrder,
  setSearchTerm,
  setPageSize,
  handleSort,
  handlePreviousPage,
  handleNextPage,
  children,
  isLoading,
  initialData,
  showSearch = true,
  indexField = true,
}: ITanstackTableViewProps<T>) => {
  const table = useReactTable({
    columns: useMemo(() => [
      ...(indexField ? [{
        id: 'index',
        header: 'No',
        size: 10,
        cell: (info: { row: { index: number } }) => (currentPage - 1) * pageSize + info.row.index + 1,
      }] : []),
      ...columns.filter(col => col.id !== 'index'),
    ], [columns, indexField, currentPage, pageSize]),
    data: useMemo(() => data, [data]),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Paper elevation={0} sx={{ width: '100%' }} className='!rounded-lg'>
      <Box sx={{ p: 2 }}>
        {showSearch && (
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              size="small"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ minWidth: 240 }}
            />
            {children}
          </Box>
        )}

        <TableContainer className='!rounded-lg overflow-auto'>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      align={header.column.id === 'action' ? 'center' : 'left'}
                      sx={{
                        width: header.column.columnDef.size,
                        cursor: header.column.id !== 'action' ? 'pointer' : 'default'
                      }}
                      onClick={() =>
                        header.column.id !== 'action' ? handleSort(header.column.id) : undefined
                      }
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: header.column.id === 'action' ? 'center' : 'flex-start' }}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.id !== 'action' && (
                          sortBy === header.column.id ? (
                            sortOrder === 'asc' ? (
                              <KeyboardArrowUpIcon fontSize="small" sx={{ ml: 1 }} />
                            ) : (
                              <KeyboardArrowUpIcon fontSize="small" sx={{ ml: 1, transform: 'rotate(180deg)' }} />
                            )
                          ) : (
                            <UnfoldMoreIcon fontSize="small" sx={{ ml: 1 }} />
                          )
                        )}
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length + (indexField ? 1 : 0)} align="center" sx={{ py: 8 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows.length === 0 && !initialData ? (
                <TableRow>
                  <TableCell colSpan={columns.length + (indexField ? 1 : 0)} align="center" sx={{ py: 8 }}>
                    <Typography color="text.secondary">No data available</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    hover
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        align={cell.column.id === 'action' ? 'center' : 'left'}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">Showing</Typography>
            <Select
              size="small"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              sx={{ minWidth: 80, padding: '0' }}
            >
              {[15].map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
            <Typography variant="body2">of {totalData} entries</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              size="small"
              className='!text-black hover:bg-gray-200 !rounded-full'
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              size="small"
              className='!text-black hover:bg-gray-200 !rounded-full'
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default TanstackTableView;
