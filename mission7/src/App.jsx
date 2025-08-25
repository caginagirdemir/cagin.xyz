import React from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import GamePage from './components/GamePage';
import './App.css';

function App() {
  return (
    <PrivyProvider
      appId="cmeg2vp8i00evk30a8e99luiv"
      config={{
        loginMethodsAndOrder: {
          primary: ['privy:cmd8euall0037le0my79qpz42'],
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </PrivyProvider>
  );
}

export default App;
