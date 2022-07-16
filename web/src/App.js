import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppFrame from './layouts/AppFrame';

const queryClient = new QueryClient();

export default function App() {
  const theme = extendTheme({
    styles: {
      global: {
        body: {
          color: 'rgb(14, 27, 77)'
        }
      }
    },
    colors: {
      primaryColor: 'rgb(14, 27, 77)',
      lightTextColor: 'rgb(239, 240, 245, 0.75)'
    },
    fonts: {
      body: "'Open Sans', sans-serif"
    }
  });

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <QueryClientProvider client={queryClient}>
          <AppFrame />
        </QueryClientProvider>
      </Router>
    </ChakraProvider>
  );
}
