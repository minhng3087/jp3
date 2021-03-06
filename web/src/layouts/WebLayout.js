import React from 'react';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function WebLayout() {
  return (
    <Box>
      <NavBar />
      <Outlet />
    </Box>
  );
}
