import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Public } from './Public/Public';
export const Home = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Public />} />
      </Routes>
    </div>
  );
};
