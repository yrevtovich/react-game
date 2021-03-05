import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Footer from '../../components/Footer/Footer';
import Game from '../../components/Game/Game';
import Settings from '../../components/Settings/Settings';
import Statistics from '../../components/Statistics/Statistics';
import KeyboardKeys from '../../components/KeyboardKeys/KeyboardKeys';
import constants from '../../constants';

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

interface ISettings {
  applicationMusic: boolean,
  applicationMusicVolume: number,
  gameMusic: boolean,
  gameMusicVolume: number,
  gameSounds: boolean,
  gameSoundsVolume: number,
}

const GamePage: React.FC = () => {
  const [settings, setSettings] = useState<ISettings>(constants.DEFAULT_SETTINGS);
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

  const changeSettings = (newSettings: ISettings) => {
    setSettings(newSettings);
  };

  useEffect(() => {
    const data = localStorage.getItem('snakeGameSettings');

    if (data) {
      const savedData = JSON.parse(data) as ISettings;
      setSettings(savedData);
    }
  }, []);

  useEffect(() => {
    localStorage.snakeGameSettings = JSON.stringify(settings);
  }, [settings]);

  return (
    <div className={classes.root}>
      <Game
        toggleStatistics={toggleStatistics}
        toggleSettings={toggleSettings}
        toggleKeyboardKeys={toggleKeyboardKeys}
        settings={settings}
      />
      <Statistics
        open={isStatisticsOpened}
        handleOnClose={toggleStatistics}
      />
      <Settings
        open={isSettingsOpened}
        handleOnClose={toggleSettings}
        changeSettings={changeSettings}
        settings={settings}
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
