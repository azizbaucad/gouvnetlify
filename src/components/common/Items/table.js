import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Box,
  HStack,
  Button,
  Select,
  Text,
  Tag,
} from '@chakra-ui/react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { ButtonItem } from './buttonItem';
import { useState } from 'react';

export const TableItem = ({ data, columns, ButtonComponent }) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
  });

  // Function to get the background color based on etat
  const getStatusBadge = (etat) => {
    switch (etat.toLowerCase()) {
      case 'terminé':
        return (
          <Tag size="sm" colorScheme="green">
            Success
          </Tag>
        );
      case 'en cours':
        return (
          <Tag size="sm" colorScheme="yellow">
            In Progress
          </Tag>
        );
      case 'non demare':
        return (
          <Tag size="sm" colorScheme="red">
            Non démaré
          </Tag>
        );
      default:
        return (
          <Tag size="sm" colorScheme="gray">
            Unknown
          </Tag>
        );
    }
  };

  return (
    <Box bg={'#fff'} p={4} borderRadius={'5'}>
      {/* Search / Filter Input */}
      <HStack mb={4} mt={1} justify="space-between">
        <Input
          borderColor={'gray.300'}
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Rechercher un projet ..."
          width="300px"
        />
        {ButtonComponent && <ButtonComponent />}
      </HStack>

      {/* Table */}
      <Box maxHeight="400px" overflowY="auto" overflowX="auto">
        <Table bg={'#fff'} fontSize={'lg'}>
          <Thead fontSize={'lg'}>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    p={1}
                    fontSize="sm"
                    textTransform={'capitalize'}
                    bg={'blue.900'}
                    color={'#fff'}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id} p={1} fontSize="sm">
                    {cell.column.id === 'etat'
                      ? getStatusBadge(cell.getValue())
                      : flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Pagination */}
      <HStack mt={4} justify="space-between">
        <HStack gap={1}>
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <Text fontSize={'sm'} color={'gray.800'}>
              Previous
            </Text>
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <Text fontSize={'sm'} color={'gray.800'}>
              Next
            </Text>
          </Button>
        </HStack>
        <Box>
          <Text as={'span'} fontSize={'sm'} color={'gray.800'}>
            Page{' '}
          </Text>
          <Text as={'strong'} fontSize={'sm'} color={'gray.800'}>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </Text>{' '}
          <Text as={'span'} fontSize={'sm'} color={'gray.800'}>
            Go to page:{' '}
          </Text>
          <Input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            width="80px"
          />
        </Box>
        <Box>
          <Select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            width="150px"
          >
            {[10, 20, 30, 50].map((size) => (
              <option key={size} value={size}>
                <Text as={'span'} fontSize={'sm'} color={'gray.800'}>
                  Show {size} rows
                </Text>
              </option>
            ))}
          </Select>
        </Box>
      </HStack>
    </Box>
  );
};
