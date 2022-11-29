import React from 'react';
import { Outlet } from 'react-router-dom';
import Book from '../components/organisms/Book';

function BookPage() {
  return (
    <>
      <Book />
      <Outlet />
    </>
  );
}

export default BookPage;
