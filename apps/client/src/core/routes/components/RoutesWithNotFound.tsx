import NotFound from '@components/templates/notFoundPage/NotFoundPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

interface Props {
  children: React.ReactNode[] | React.ReactNode;
}

const RoutesWithNotFound = ({ children }: Props) => {
  return (
    <Routes>
      {children}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default RoutesWithNotFound;
