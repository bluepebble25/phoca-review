import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import BookPage from './pages/BookPage';
import CardDetailPage from './pages/CardDetailPage';
import CreateCardPage from './pages/CreateCardPage';
import EditCardPage from './pages/EditCardPage';
import Nav from './components/organisms/Nav';

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/cards" />} />
        <Route path="/cards" element={<BookPage />}>
          <Route path="/cards/:id" element={<CardDetailPage />} />
        </Route>
        <Route path="/create" element={<CreateCardPage />} />
        <Route path="/edit" element={<EditCardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
