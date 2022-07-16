import React from 'react';
import { Box, Flex, IconButton, Link, Text } from '@chakra-ui/react';
import {
  HiOutlineSearch,
  HiOutlineShoppingCart
} from 'react-icons/hi';
import { Link as NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <Box bg="primaryColor" color="lightTextColor">
      <Box
        p="20px 5rem 8px"
        display="grid"
        gridTemplateColumns="1fr 2fr 1fr"
        alignItems="center"
        maxW="70rem"
        m="0 auto"
      >
        <Flex>
          <IconButton
            // variant="unstyled"
            bg="none"
            _hover={{ bg: 'none' }}
            icon={<HiOutlineSearch color="lightTextColor" />}
          />
        </Flex>
        <Text justifySelf="center" fontWeight="bold" fontSize="xl">
          Shopping Cart
        </Text>
        <Flex justifySelf="right">
          <IconButton
            bg="none"
            _hover={{ bg: 'none' }}
            icon={<HiOutlineShoppingCart color="lightTextColor" />}
          />
        </Flex>
        <Box gridColumn="2/3" justifySelf="center" mt={1}>
          <Flex>
            <Link as={NavLink} to="/" p="0.5rem">
              Home
            </Link>
            <Link as={NavLink} to="/" p="0.5rem">
              Catalog
            </Link>
            <Link as={NavLink} to="/" p="0.5rem">
              Contact
            </Link>
            <Link as={NavLink} to="/" p="0.5rem">
              Happy page
            </Link>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
