import {
  Box,
  Divider,
  Flex,
  Image,
  Spinner,
  Text
} from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import OrderAPI from '../api/OrderAPI';
import NotFound from '../components/NotFound';

export default function DetailOrder() {
  const { id } = useParams();
  const { isLoading, data } = useQuery('userGetDetailOrder', () =>
    OrderAPI.userGetDetailOrder(id)
    );
    
    console.log(data)
  console.log(data);

  if (isLoading) {
    return (
      <Flex
        w="full"
        h="full"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner mt="10rem" />
      </Flex>
    );
  }

  if (data) {
    return (
      <Box p="60px 0">
        <Box maxW="70rem" m="0 auto" p="0 5rem">
          <Flex px={5} w="40%" bg="blackAlpha.50" flexDir="column">
            <Flex
              mt="60px"
              flexDir="column"
              w="full"
              gap={4}
              h="50%"
              overflowY="auto"
            >
              {data.order_details.map((orderDetail, id) => {
                const {
                  product: { image, name }
                } = orderDetail;
                return (
                  <Flex
                    key={`product-${id}`}
                    justifyContent="space-between"
                    w="full"
                  >
                    <Flex gap={3}>
                      <Box width="20">
                        <Image maxW="full" h="auto" src={image} />
                      </Box>
                      <Box>
                        <Text
                          fontWeight={700}
                          maxW="10rem"
                          fontSize="sm"
                          wordBreak="break-word"
                        >
                          {name}
                        </Text>
                        <Text
                          maxW="10rem"
                          fontSize="sm"
                          wordBreak="break-word"
                        >
                          {orderDetail.price} x {orderDetail.quantity}
                        </Text>
                      </Box>
                    </Flex>
                    <Text pl={1} pt={2} fontSize="md">
                      ${orderDetail.quantity * orderDetail.price}
                    </Text>
                  </Flex>
                );
              })}
            </Flex>
            <Divider borderColor="gray.300" my={3} />
            <Flex justifyContent="space-between" alignItems="center">
              <Text color="gray.500" fontSize="sm">
                Shipping fee
              </Text>
              <Text color="gray.500">$10</Text>
            </Flex>
            <Divider borderColor="gray.300" my={3} />
            <Flex justifyContent="space-between" alignItems="center">
              <Text color="gray.500" fontSize="lg">
                Total
              </Text>
              <Text color="gray.500">${data.total_price}</Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
    );
  }
  return <NotFound message="Order not found" />;
}
