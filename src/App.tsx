/* eslint-disable quote-props */
import React, { useState } from 'react';
import Menu from './components/Menu/Menu';
import GameField from './components/GameField/GameField';
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
    'Statistics': <Menu list={menuList} menuItemClick={changeOpened} />,
    'Settings': <Menu list={menuList} menuItemClick={changeOpened} />,
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
    </div>
  );
};

export default App;
