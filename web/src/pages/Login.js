/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useRef } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useForm } from 'react-hook-form';

export default function Login() {
  const history = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef(null);
  const toast = useToast();
  const { register, handleSubmit, reset } = useForm();

  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  };
  // const wait = (ms) =>
  // new Promise((resolve) => setTimeout(resolve, ms));
  const onSubmit = useCallback((data) => {
    // AuthAPI.login(data).then((response) => {
    //   console.log(response);
    //   if (response.success) {
    //     setToken(response.token.access_token);
    //     setCurrentUser(response.user);
    //     toast({
    //       title: 'Đăng nhập thành công!',
    //       position: 'top',
    //       duration: 3000,
    //       status: 'success'
    //     });
    //     history(getIntendedUrl());
    //   } else {
    //     reset();
    //     toast({
    //       title: 'Đăng nhập thất bại!',
    //       position: 'top',
    //       description: response.message,
    //       duration: 5000,
    //       status: 'error'
    //     });
    //   }
    // });
  }, []);

  return (
    <Container
      maxW="lg"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
      h="full"
      color="primaryColor"
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing="2" textAlign="center">
            <Text
              fontSize="3xl"
              fontWeight="bold"
              lineHeight="1.2"
              color="primaryColor"
            >
              Login to Shopping
            </Text>
            <HStack justify="center">
              <Text color="muted">Don't have an account?</Text>
              <Button
                variant="link"
                colorScheme="blue"
                color="primaryColor"
                onClick={() => history('/signup')}
              >
                Sign up
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useBreakpointValue({
            base: 'white'
          })}
          boxShadow={{
            base: 'none',
            sm: useColorModeValue('md', 'md-dark')
          }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input type="email" {...register('email')} />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup>
                    <Input
                      ref={inputRef}
                      type={isOpen ? 'text' : 'password'}
                      autoComplete="current-password"
                      {...register('password')}
                    />
                    <InputRightElement>
                      <IconButton
                        variant="link"
                        icon={isOpen ? <HiEyeOff /> : <HiEye />}
                        onClick={onClickReveal}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Stack>
              {/* <HStack justify="space-between">
                <Checkbox defaultIsChecked>Nhớ mật khẩu</Checkbox>
                <Button variant="link" colorScheme="blue" size="sm">
                  Quên mật khẩu?
                </Button>
              </HStack> */}
              <Stack spacing="6">
                <Button
                  type="submit"
                  colorScheme="blue"
                  bg="primaryColor"
                  _hover={{ bg: 'primaryColor' }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
}
