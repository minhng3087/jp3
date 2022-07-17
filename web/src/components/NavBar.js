import React, { useCallback } from 'react';
import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/react';
import {
  HiOutlineSearch,
  HiOutlineShoppingCart
} from 'react-icons/hi';
import { Link as NavLink, useNavigate } from 'react-router-dom';
import { useCartContext } from '../contexts/CartContext';
import { useUserAuthContext } from '../contexts/UserAuthContext';
import UserAuthAPI from '../api/UserAuthAPI';
import { setUserToken } from '../utils/userAuth';

export default function NavBar() {
  const history = useNavigate();
  const { authenticated, setCurrentUser, redirectWhenNoAuth } =
    useUserAuthContext();
  const { toggleCartOpen, resetCart } = useCartContext();

  const handleClickCart = useCallback(() => {
    if (!authenticated) {
      redirectWhenNoAuth();
      return;
    }
    toggleCartOpen();
  }, [authenticated, redirectWhenNoAuth, toggleCartOpen]);

  const handleLogOut = useCallback(() => {
    UserAuthAPI.logout().then((response) => {
      if (response.success) {
        resetCart();
        setCurrentUser(null);
        setUserToken(null);
        history('/');
      }
    });
  }, [history, resetCart, setCurrentUser]);

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
        <Flex justifySelf="right" alignItems="center" gap={3}>
          <IconButton
            onClick={handleClickCart}
            bg="none"
            _hover={{ bg: 'none' }}
            icon={<HiOutlineShoppingCart color="lightTextColor" />}
          />
          {authenticated ? (
            <Menu>
              <MenuButton as={Avatar} size="xs" cursor="pointer" />
              <MenuList color="primaryColor">
                <MenuItem>My orders</MenuItem>
                <MenuItem onClick={handleLogOut}>Log out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link as={NavLink} to="/login">
              Log in
            </Link>
          )}
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
