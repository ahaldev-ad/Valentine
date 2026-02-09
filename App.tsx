
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import SharePage from './pages/SharePage';
import ViewPage from './pages/ViewPage';
import GoldLayout from './components/GoldLayout';

const App: React.FC = () => {
  return (
    <HashRouter>
      <GoldLayout>
        <Routes>
          <Route path="/" element={<CreatePage />} />
          <Route path="/share" element={<SharePage />} />
          <Route path="/view/:messageId" element={<ViewPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </GoldLayout>
    </HashRouter>
  );
};

export default App;
