import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import BookPage from './pages/BookPage';
import CardDetailPage from './pages/CardDetailPage';
import CreateCardPage from './pages/CreateCardPage';
import Nav from './components/organisms/Nav';

const MainLayout = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Nav />
      <Outlet />
    </motion.div>
  );
};

interface createCardPageWraperProps {
  isEditPage: boolean;
}
const CreateCardPageWrapper = ({ isEditPage }: createCardPageWraperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <CreateCardPage isEditPage={isEditPage} />
    </motion.div>
  );
};

function App() {
  return (
    <AnimatePresence>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Navigate to="/cards" />} />
          <Route path="/cards" element={<BookPage />}>
            <Route path="/cards/:id" element={<CardDetailPage />} />
          </Route>
        </Route>
        <Route
          path="/create"
          element={<CreateCardPageWrapper isEditPage={false} />}
        />
        <Route
          path="/edit/cards/:id"
          element={<CreateCardPageWrapper isEditPage={true} />}
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
