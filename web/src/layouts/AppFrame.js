import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useUserAuthContext } from '../contexts/UserAuthContext';
import Checkout from '../pages/Checkout';
import DetailOrder from '../pages/DetailOrder';
import DetailProduct from '../pages/DetailProduct';
import FullPageSpinner from '../pages/FullPageSpinner';
import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import MyOrders from '../pages/MyOrders';
import Signup from '../pages/Signup';
import WebLayout from './WebLayout';

export default function AppFrame() {
  const { authenticated, initializing } = useUserAuthContext();

  return initializing ? (
    <FullPageSpinner />
  ) : (
    <Routes>
      <Route path="/" element={<WebLayout />}>
        <Route index element={<Homepage />} />
        <Route
          path="login"
          element={
            authenticated ? <Navigate to="/" replace /> : <Login />
          }
        />
        <Route path="signup" element={<Signup />} />
        <Route path="product/:id" element={<DetailProduct />} />
        <Route
          path="orders"
          element={
            authenticated ? (
              <MyOrders />
            ) : (
              <Navigate to="login" replace />
            )
          }
        />
        <Route
          path="orders/:id"
          element={
            authenticated ? (
              <DetailOrder />
            ) : (
              <Navigate to="login" replace />
            )
          }
        />
      </Route>
      <Route
        path="checkout"
        element={
          authenticated ? (
            <Checkout />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}
