/* eslint-disable quote-props */
import React, { useState } from 'react';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';
import GameField from './components/GameField/GameField';
import Settings from './components/Settings/Settings';
import Statistics from './components/Statistics/Statistics';
import './App.css';

const App: React.FC = () => {
  const [isStartPage, setIsStartPage] = useState<boolean>(true);
  const [opened, setOpened] = useState<string>('Menu');
  const menuList = ['New game', 'Continue', 'Statistics', 'Settings'];

  const changeOpened = (newOpened: string): void => {
    setOpened(newOpened);
  };

  const openMenu = (): void => {
    setOpened('Menu');
  };

  const closeStartPage = () => {
    setIsStartPage(false);
  };

  const pages: { [key: string]: JSX.Element } = {
    'New game': <GameField openMenu={openMenu} />,
    'Continue': <GameField openMenu={openMenu} />,
    'Statistics': <Statistics />,
    'Settings': <Settings />,
    'Menu': <Menu list={menuList} menuItemClick={changeOpened} />,
  };

  return (
    <div className="container">
      {/* <Menu
        list={menuList}
        menuItemClick={changeOpened}
      />
      <GameField /> */}
      {isStartPage
        ? <button onClick={closeStartPage} type="button">Press me...</button>
        : pages[opened]}
      <Footer />
    </div>
  );
};

export default App;
