import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import WebLayout from './WebLayout';

export default function AppFrame() {
  return (
    <Routes>
      <Route path="/" element={<WebLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}
