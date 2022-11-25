import React from 'react';
import { Outlet } from 'react-router-dom';

function BookPage() {
  return (
    <div>
      BookPage
      <Outlet />
    </div>
  );
}

export default BookPage;
