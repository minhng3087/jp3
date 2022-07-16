import {
  Box,
  Button,
  Flex,
  Image,
  Select,
  Spinner,
  Text
} from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import ProductAPI from '../api/ProductAPI';
import { useCartContext } from '../contexts/CartContext';

export default function Products() {
  const history = useNavigate();
  const { addToCart, toggleCartOpen } = useCartContext();

  const { isLoading, data: products } = useQuery('products', () =>
    ProductAPI.getAllProducts()
  );

  const handleClickProduct = useCallback(
    (e, id) => {
      if (e.target.tagName !== 'BUTTON') {
        history(`product/${id}`);
      }
    },
    [history]
  );

  return isLoading ? (
    <Flex
      w="full"
      h="full"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner mt="10rem" />
    </Flex>
  ) : (
    <Box p="60px 0">
      <Box maxW="70rem" m="0 auto" p="0 5rem">
        <Flex alignItems="center" gap={4}>
          <Text>Filter by</Text>
          <Flex>
            <Select size="sm">
              <option value="">Price</option>
            </Select>
          </Flex>
        </Flex>
      </Box>
      <Box mt="30px">
        <Box maxW="70rem" m="0 auto" p="0 5rem">
          <Flex flexWrap="wrap" columnGap="28px" rowGap="28px">
            {products.map((product, i) => {
              const { id, name, price, image } = product;
              return (
                <Box
                  cursor="pointer"
                  key={`product-${i + 1}`}
                  w="calc(25% - 28px * 3 / 4)"
                  maxW="calc(25% - 28px * 3 / 4)"
                  flexGrow={1}
                  flexShrink={0}
                  onClick={(e) => handleClickProduct(e, id)}
                >
                  <Box h="full" position="relative">
                    <Flex
                      h="full"
                      flexDir="column"
                      border="1px solid rgb(14, 27, 77)"
                      borderRadius="2xl"
                      position="relative"
                    >
                      <Flex
                        w="full"
                        alignItems="stretch"
                        overflow="hidden"
                        position="relative"
                        height="200px"
                      >
                        <Box
                          overflow="hidden"
                          zIndex={0}
                          m="10px"
                          w="calc(100% - 2 * 10px)"
                          bottom={0}
                          top={0}
                          position="absolute"
                        >
                          <Box
                            w="full"
                            bottom={0}
                            position="absolute"
                            top={0}
                            overflow="hidden"
                          >
                            <Image
                              src={image}
                              objectFit="cover"
                              position="absolute"
                              top={0}
                              left={0}
                              h="full"
                              w="full"
                              maxW="full"
                            />
                          </Box>
                        </Box>
                      </Flex>
                      <Flex
                        w="full"
                        flexDir="column"
                        p="10px"
                        pt={0}
                        flexGrow={1}
                      >
                        <Flex pb={3} flexDir="column">
                          <Text fontWeight="bold">{name}</Text>
                          <Text>${price}</Text>
                        </Flex>
                        <Button
                          onClick={() => {
                            addToCart(product);
                            toggleCartOpen();
                          }}
                        >
                          Add to cart
                        </Button>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              );
            })}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
