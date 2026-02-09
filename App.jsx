import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreatePage from './pages/CreatePage.jsx';
import SharePage from './pages/SharePage.jsx';
import ViewPage from './pages/ViewPage.jsx';
import GoldLayout from './components/GoldLayout.jsx';

const App = () => {
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