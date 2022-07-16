import {
  Box,
  Button,
  Flex,
  Image,
  Select,
  Text
} from '@chakra-ui/react';
import React from 'react';

const products = [
  {
    label: 'vjp',
    price: 12.95,
    img: '/img/example-product.jpg'
  },
  {
    label: 'vjp',
    price: 12.95,
    img: '/img/example-product.jpg'
  },
  {
    label: 'vjp',
    price: 12.95,
    img: '/img/laptop.jpg'
  },
  {
    label: 'vjp',
    price: 12.95,
    img: '/img/example-product.jpg'
  },
  {
    label: 'vjp',
    price: 12.95,
    img: '/img/example-product.jpg'
  },
  {
    label: 'vjp',
    price: 12.95,
    img: '/img/example-product.jpg'
  },
  {
    label: 'vjp',
    price: 12.95,
    img: '/img/example-product.jpg'
  },
  {
    label: 'vjp',
    price: 12.95,
    img: '/img/example-product.jpg'
  },
  {
    label: 'vjp',
    price: 12.95,
    img: '/img/example-product.jpg'
  },
  {
    label: 'vjp',
    price: 12.95,
    img: '/img/example-product.jpg'
  },
  {
    label: 'vjp',
    price: 12.95,
    img: '/img/spiderman.png'
  }
];

export default function Products() {
  return (
    <Box p="60px 0">
      <Box maxW="70rem" m="0 auto" p="0 5rem">
        <Flex alignItems="center" gap={4}>
          <Text>Filter by</Text>
          <Flex>
            <Select>
              <option value="">Price</option>
            </Select>
          </Flex>
        </Flex>
      </Box>
      <Box mt="30px">
        <Box maxW="70rem" m="0 auto" p="0 5rem">
          <Flex flexWrap="wrap" columnGap="28px" rowGap="28px">
            {products.map(({ label, price, img }, i) => (
              <Box
                key={`product-${i + 1}`}
                w="calc(25% - 28px * 3 / 4)"
                maxW="calc(25% - 28px * 3 / 4)"
                flexGrow={1}
                flexShrink={0}
              >
                <Box h="full" position="relative">
                  <Flex
                    h="full"
                    flexDir="column"
                    border="1px solid rgb(14, 27, 77)"
                    borderRadius="lg"
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
                            src={img}
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
                        <Text fontWeight="bold">{label}</Text>
                        <Text>${price}</Text>
                      </Flex>
                      <Button>Add to cart</Button>
                    </Flex>
                  </Flex>
                </Box>
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
