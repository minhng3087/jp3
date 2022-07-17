import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import OrderAPI from '../api/OrderAPI';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export default function MyOrders() {
  const history = useNavigate();
  const [page, setPage] = useState(1);
  const { isLoading, data } = useQuery(
    ['userGetAllOrders', page],
    () => OrderAPI.userGetAllOrders(page)
  );

  console.log(data);

  return (
    <Box p="60px 0">
      <Box maxW="70rem" m="0 auto" p="0 5rem">
        <Flex background="white" boxShadow="sm" borderRadius="lg">
          <TableContainer whiteSpace="unset" w="full">
            <Flex
              padding={6}
              justifyContent="space-between"
              borderBottom="1px solid"
              borderColor="gray.100"
            >
              <Text fontWeight={700} fontSize="2xl">
                My orders
              </Text>
            </Flex>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Total price</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              {isLoading ? (
                <Tbody>
                  <Tr>
                    <Td>
                      <Spinner mt={2} ml={2} />
                    </Td>
                  </Tr>
                </Tbody>
              ) : (
                <Tbody>
                  {data?.data?.length > 0 &&
                    data.data.map((order, i) => (
                      <Tr key={`user-${i + 1}`}>
                        <Td>{order.id}</Td>
                        <Td>{order.total_price}</Td>
                        <Td>
                          <Button
                            variant="link"
                            onClick={() =>
                              history(`/orders/${order.id}`)
                            }
                            color="primaryColor"
                          >
                            See detail
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              )}
            </Table>
            {!isLoading && data?.data?.length === 0 ? (
              <Box textAlign="center" p="20px	100px" color="gray.800">
                No orders yet
              </Box>
            ) : (
              <Flex justifyContent="space-between" px={6} py={2}>
                <Button
                  leftIcon={<HiChevronLeft />}
                  onClick={() =>
                    setPage((old) => Math.max(old - 1, 0))
                  }
                  isDisabled={!data?.prev_page_url}
                >
                  Previous
                </Button>
                <Button
                  rightIcon={<HiChevronRight />}
                  onClick={() => setPage((old) => old + 1)}
                  isDisabled={!data?.next_page_url}
                >
                  Next
                </Button>
              </Flex>
            )}
          </TableContainer>
        </Flex>
      </Box>
    </Box>
  );
}
