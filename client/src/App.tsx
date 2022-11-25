import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BookPage from './pages/BookPage';
import CardDetailPage from './pages/CardDetailPage';
import CreateCardPage from './pages/CreateCardPage';
import EditCardPage from './pages/EditCardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/cards" />} />
        <Route path="/cards" element={<BookPage />}>
          <Route path="/cards/:id" element={<CardDetailPage />} />
        </Route>
        <Route path="/create" element={<CreateCardPage />} />
        <Route path="/edit" element={<EditCardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
