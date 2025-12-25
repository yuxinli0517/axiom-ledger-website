// src/App.tsx
import { useState } from 'react';
import Background from './components/Background';
import PublicPage from './pages/PublicPage';
import PrivatePage from './pages/PrivatePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Background />
      {isLoggedIn ? (
        <PrivatePage onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <PublicPage onLogin={() => setIsLoggedIn(true)} />
      )}
    </>
  );
}

export default App;