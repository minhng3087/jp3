import React, { useCallback, useEffect, useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  FormControl,
  FormLabel,
  Flex,
  Box,
  Text,
  useToast
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import ProductAPI from '../api/ProductAPI';

export default function ProductFormDrawer({ isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const handleCloseDrawer = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const onSubmit = useCallback(
    (data) => {
      setIsSubmitting(true);
      ProductAPI.adminAddProduct(data)
        .then((response) => {
          setIsSubmitting(false);
          toast({
            title: response.message,
            duration: 3000,
            status: response.success ? 'success' : 'error'
          });
          if (response.success) {
            handleCloseDrawer();
          }
        })
        .catch(() => {
          setIsSubmitting(false);
          toast({
            title: 'An unknown error occurred',
            duration: 3000,
            status: 'error'
          });
        });
    },
    [handleCloseDrawer, toast]
  );

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={handleCloseDrawer}
    >
      <DrawerOverlay />
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add new product</DrawerHeader>

          <DrawerBody>
            <Flex flexDir="column" gap={5}>
              <FormControl>
                <FormLabel>Product name</FormLabel>
                <Input
                  placeholder="Product name"
                  {...register('name', {
                    required: 'Product name is a required field'
                  })}
                />
                {errors.name ? (
                  <Text color="red" mt={1}>
                    {errors.name.message}
                  </Text>
                ) : null}
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  placeholder="Price"
                  {...register('price', {
                    required: 'Price is a required field'
                  })}
                />
                {errors.price ? (
                  <Text color="red" mt={1}>
                    {errors.price.message}
                  </Text>
                ) : null}
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  placeholder="Description"
                  {...register('description', {
                    required: 'Description is a required field'
                  })}
                />
                {errors.description ? (
                  <Text color="red" mt={1}>
                    {errors.description.message}
                  </Text>
                ) : null}
              </FormControl>
              <FormControl>
                <FormLabel>Image link</FormLabel>
                <Input
                  placeholder="Image link"
                  {...register('image', {
                    required: 'Image link is a required field'
                  })}
                />
                {errors.image ? (
                  <Text color="red" mt={1}>
                    {errors.image.message}
                  </Text>
                ) : null}
              </FormControl>
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={handleCloseDrawer}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              type="submit"
              isLoading={isSubmitting}
            >
              Add
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Box>
    </Drawer>
  );
}
