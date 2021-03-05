import React, { useState } from 'react';
import GamePage from './pages/GamePage/GamePage';
import StartPage from './pages/StartPage/StartPage';
import './App.css';

const App: React.FC = () => {
  const [isStartPage, setIsStartPage] = useState<boolean>(true);

  const closeStartPage = () => {
    setIsStartPage(false);
  };

  return (
    <div className="container">
      {isStartPage
        ? (
          <StartPage close={closeStartPage} />
        ) : (
          <GamePage />
        )}
    </div>
  );
};

export default App;
