import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ReplayIcon from '@material-ui/icons/Replay';
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';

const useStyles = makeStyles(() => createStyles({
  root: {
    padding: '30px 5px 10px 15px',
    width: '100%',
    maxWidth: 780,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
  },
}));

interface IProps {
  toggleIsGameInProgress: () => void,
  isGameInProgress: boolean,
  score: number,
  startNewGame: () => void,
  toggleStatistics: () => void;
  toggleSettings: () => void;
  stopGame: () => void;
  toggleFullScreen: () => void;
}

const Menu: React.FC<IProps> = ({
  toggleIsGameInProgress,
  isGameInProgress,
  score,
  startNewGame,
  toggleStatistics,
  toggleSettings,
  stopGame,
  toggleFullScreen,
}) => {
  const classes = useStyles();

  const handlerOpenModal = (handlerClallback: () => void) => () => {
    stopGame();
    handlerClallback();
  };

  return (
    <div className={classes.root}>
      <p>
        Score:
        {' '}
        {score}
      </p>
      <div className={classes.buttons}>
        <IconButton color="primary" component="span" onClick={startNewGame}>
          <ReplayIcon />
        </IconButton>
        <IconButton color="primary" component="span" onClick={toggleIsGameInProgress}>
          { isGameInProgress ? <PauseCircleOutlineIcon /> : <PlayCircleOutlineIcon />}
        </IconButton>
        <IconButton color="primary" component="span" onClick={handlerOpenModal(toggleStatistics)}>
          <EqualizerIcon />
        </IconButton>
        <IconButton color="primary" component="span" onClick={handlerOpenModal(toggleSettings)}>
          <SettingsIcon />
        </IconButton>
        <IconButton color="primary" component="span" onClick={toggleFullScreen}>
          <SettingsOverscanIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Menu;
