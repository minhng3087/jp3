import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import WebLayout from './WebLayout';

export default function AppFrame() {
  return (
    <Routes>
      <Route path="/" element={<WebLayout />}>
        <Route index element={<Homepage />} />
      </Route>
    </Routes>
  );
}
