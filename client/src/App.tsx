import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import BookPage from './pages/BookPage';
import CardDetailPage from './pages/CardDetailPage';
import CreateCardPage from './pages/CreateCardPage';
import Nav from './components/organisms/Nav';

const MainLayout = () => {
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
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/cards" />} />
        <Route path="/cards" element={<BookPage />}>
          <Route path="/cards/:id" element={<CardDetailPage />} />
        </Route>
      </Route>
      <Route path="/create" element={<CreateCardPage />} />
      <Route path="/edit/cards/:id" element={<CreateCardPage isEditPage />} />
    </Routes>
  );
}

export default App;
