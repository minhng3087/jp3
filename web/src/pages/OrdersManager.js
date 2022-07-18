import {
  Box,
  Button,
  Flex,
  IconButton,
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
import React, { useCallback, useState } from 'react';
import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineEye
} from 'react-icons/hi';
import { useQuery } from 'react-query';
import OrderAPI from '../api/OrderAPI';
import DetailOrderModal from '../components/DetailOrderModal';

export default function OrdersManager() {
  const [page, setPage] = useState(1);
  const [isDetailOrderModalOpen, setIsDetailOrderModalOpen] =
    useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { isLoading, data } = useQuery(
    ['adminGetAllOrders', page],
    () => OrderAPI.adminGetAllOrders(page),
    { keepPreviousData: true }
  );

  const toggleDetailOrderModalOpen = useCallback(() => {
    setIsDetailOrderModalOpen((prev) => !prev);
  }, []);

  const handleClickSeeDetail = useCallback(
    (order) => {
      toggleDetailOrderModalOpen();
      setSelectedOrder(order);
    },
    [toggleDetailOrderModalOpen]
  );

  console.log(data);

  return (
    <>
      <DetailOrderModal
        isOpen={isDetailOrderModalOpen}
        onClose={toggleDetailOrderModalOpen}
        selectedOrder={selectedOrder}
      />
      <Box
        paddingTop={8}
        paddingBottom={8}
        paddingInlineStart={8}
        paddingInlineEnd={8}
        marginInline="auto"
        marginTop="2rem"
        maxW="6xl"
        w="100%"
      >
        <Flex background="white" boxShadow="sm" borderRadius="lg">
          <TableContainer whiteSpace="unset" w="full">
            <Flex
              padding={6}
              justifyContent="space-between"
              borderBottom="1px solid"
              borderColor="gray.100"
            >
              <Text fontWeight="600" fontSize="xl">
                Orders
              </Text>
            </Flex>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>User</Th>
                  <Th>Email</Th>
                  <Th>Phone number</Th>
                  <Th>Address</Th>
                  <Th>Total amount</Th>
                  <Th>Actions</Th>
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
                      <Tr key={`order-${i + 1}`}>
                        <Td>{order.id}</Td>
                        <Td>{order.user.name}</Td>
                        <Td>{order.user.email}</Td>
                        <Td>{order.phone}</Td>
                        <Td>{order.address}</Td>
                        <Td>{order.total_price}</Td>
                        <Td>
                          <IconButton
                            onClick={() =>
                              handleClickSeeDetail(order)
                            }
                            icon={<HiOutlineEye />}
                          />
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
                  Trước
                </Button>
                <Button
                  rightIcon={<HiChevronRight />}
                  onClick={() => setPage((old) => old + 1)}
                  isDisabled={!data?.next_page_url}
                >
                  Sau
                </Button>
              </Flex>
            )}
          </TableContainer>
        </Flex>
      </Box>
    </>
  );
}
