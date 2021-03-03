/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Footer from '../../components/Footer/Footer';
import Game from '../../components/Game/Game';
import Settings from '../../components/Settings/Settings';
import Statistics from '../../components/Statistics/Statistics';
import KeyboardKeys from '../../components/KeyboardKeys/KeyboardKeys';

import menuSound from '../../assets/audio/menu_music.mp3';

const useStyles = makeStyles(() => createStyles({
  root: {
    width: '100%',
    height: '100%',
    backgroundImage: 'url(./assets/images/game_page.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

const GamePage: React.FC = () => {
  const [isStatisticsOpened, setIsStatisticsOpened] = useState<boolean>(false);
  const [isSettingsOpened, setIsSettingsOpened] = useState<boolean>(false);
  const [isKeyboardKeysOpened, setIsKeyboardKeysOpened] = useState<boolean>(false);

  const classes = useStyles();

  const toggleStatistics = (): void => {
    setIsStatisticsOpened((state) => !state);
  };

  const toggleSettings = (): void => {
    setIsSettingsOpened((state) => !state);
  };
  const toggleKeyboardKeys = (): void => {
    setIsKeyboardKeysOpened((state) => !state);
  };

  // useEffect(() => {
  //   const audio = new Audio(menuSound);
  //   audio.loop = true;
  //   audio.play();
  //   return () => audio.pause();
  // }, []);

  return (
    <div className={classes.root}>
      <Game
        toggleStatistics={toggleStatistics}
        toggleSettings={toggleSettings}
        toggleKeyboardKeys={toggleKeyboardKeys}
      />
      <Statistics
        open={isStatisticsOpened}
        handleOnClose={toggleStatistics}
      />
      <Settings
        open={isSettingsOpened}
        handleOnClose={toggleSettings}
      />
      <KeyboardKeys
        open={isKeyboardKeysOpened}
        handleOnClose={toggleKeyboardKeys}
      />
      <Footer />
    </div>
  );
};

export default GamePage;
