import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAdminAuthContext } from '../contexts/AdminAuthContext';
import AdminLogIn from '../pages/AdminLogIn';
import FullPageSpinner from '../pages/FullPageSpinner';
import OrdersManager from '../pages/OrdersManager';
import ProductsManager from '../pages/ProductsManager';
import DashboardLayout from './DashboardLayout';

export default function AdminFrame() {
  const { authenticated, initializing } = useAdminAuthContext();

  return initializing ? (
    <FullPageSpinner />
  ) : (
    <Routes>
      <Route
        path="/admin/login"
        element={
          authenticated ? (
            <Navigate to="/admin" replace />
          ) : (
            <AdminLogIn />
          )
        }
      />
      <Route
        path="/admin"
        element={
          authenticated ? (
            <DashboardLayout />
          ) : (
            <Navigate to="/admin/login" replace />
          )
        }
      >
        <Route
          path="orders"
          element={
            authenticated ? (
              <OrdersManager />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />
        <Route
          path="products"
          element={
            authenticated ? (
              <ProductsManager />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />
      </Route>
    </Routes>
  );
}
