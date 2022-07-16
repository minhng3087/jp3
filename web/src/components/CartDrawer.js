import React, { useCallback } from 'react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  IconButton,
  Image,
  Text
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { HiMinus, HiOutlineTrash, HiPlus } from 'react-icons/hi';
import { useCartContext } from '../contexts/CartContext';

export default function CartDrawer({ isOpen, onClose, cart }) {
  const history = useNavigate();

  const { getTotalAmount, removeItemFromCart, handleChangeQuantity } =
    useCartContext();

  const renderDrawerContent = useCallback(() => {
    if (cart?.total > 0) {
      return (
        <>
          <DrawerHeader px={4}>Your cart</DrawerHeader>
          <DrawerBody px={4}>
            <Flex justifyContent="space-between">
              <Text
                textTransform="uppercase"
                color="gray.500"
                fontSize="xs"
              >
                Product
              </Text>
              <Text
                textTransform="uppercase"
                color="gray.500"
                fontSize="xs"
              >
                Total
              </Text>
            </Flex>
            <Divider />
            {cart.products.map(
              ({ id, name, price, quantity, image }) => (
                <Box w="full" mb={2}>
                  <Grid
                    mb={1}
                    gridTemplate="auto auto / 1fr 1fr 1fr 1fr"
                    gap={2}
                  >
                    <Box
                      pt={2}
                      gridRow="1/3"
                      verticalAlign="top"
                      width="20"
                    >
                      <Image maxW="full" h="auto" src={image} />
                    </Box>
                    <Box
                      pl={1}
                      pt={2}
                      width="auto"
                      gridColumn="2/4"
                      verticalAlign="top"
                    >
                      <Text
                        fontWeight={700}
                        maxW="10rem"
                        fontSize="xs"
                        wordBreak="break-word"
                      >
                        {name}
                      </Text>
                      <Text
                        wordBreak="break-all"
                        mt={1}
                        fontSize="xs"
                      >
                        ${price}
                      </Text>
                    </Box>
                    <Flex
                      alignItems="flex-start"
                      justifyContent="flex-end"
                      pl={1}
                      pt={2}
                      fontSize="sm"
                    >
                      ${price * quantity}
                    </Flex>
                    <Flex
                      gridColumn="2/5"
                      pl={1}
                      alignItems="center"
                      gap={1}
                    >
                      <Box
                        border="1px solid rgb(14, 27, 77)"
                        w={24}
                        borderRadius="lg"
                      >
                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                          p="5px 5px"
                        >
                          <IconButton
                            icon={<HiMinus />}
                            size="xs"
                            onClick={() =>
                              handleChangeQuantity(id, 'minus')
                            }
                          />
                          <Text fontSize="xs">{quantity}</Text>
                          <IconButton
                            icon={<HiPlus />}
                            size="xs"
                            onClick={() =>
                              handleChangeQuantity(id, 'plus')
                            }
                          />
                        </Flex>
                      </Box>
                      <IconButton
                        size="sm"
                        icon={<HiOutlineTrash />}
                        bg="none"
                        _hover={{ bg: 'none' }}
                        onClick={() => removeItemFromCart(id)}
                      />
                    </Flex>
                  </Grid>
                </Box>
              )
            )}
          </DrawerBody>
          <Box px={4}>
            <Divider />
          </Box>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            px={4}
            pt={2}
          >
            <Text
              textTransform="uppercase"
              color="gray.500"
              fontWeight={700}
              fontSize="sm"
            >
              Subtotal
            </Text>
            <Text textTransform="uppercase" color="gray.500">
              ${getTotalAmount()}
            </Text>
          </Flex>
          <DrawerFooter px={4}>
            <Button
              w="full"
              color="white"
              bg="primaryColor"
              _hover={{ bg: 'primaryColor' }}
            >
              Checkout
            </Button>
          </DrawerFooter>
        </>
      );
    }

    return (
      <Flex alignItems="center" justifyContent="center" h="full">
        <Box textAlign="center">
          <Text fontWeight={700} fontSize="xl">
            Your cart is empty
          </Text>
          <Button
            color="lightTextColor"
            bg="primaryColor"
            mt={3}
            _hover={{ bg: 'primaryColor' }}
            onClick={() => {
              history('/');
              onClose();
            }}
          >
            Continue shopping
          </Button>
        </Box>
      </Flex>
    );
  }, [
    cart.products,
    cart?.total,
    history,
    onClose,
    getTotalAmount,
    handleChangeQuantity,
    removeItemFromCart
  ]);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        {renderDrawerContent()}
      </DrawerContent>
    </Drawer>
  );
}
