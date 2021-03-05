import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import SettingsSlider from '../SettingsSlider/SettingsSlider';
import Switcher from '../Switcher/Switcher';
import ColorPicker from '../ColorPicker/ColorPicker';
import { ISettings } from '../../interfaces';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  listItem__label: {
    width: '65%',
  },
  listItem__input: {
    width: '35%',
  },
  title: {
    margin: theme.spacing(2, 0, 2),
    textAlign: 'center',
  },
}));
interface IProps {
  open: boolean;
  handleOnClose: () => void;
  changeSettings: (newSettings: ISettings) => void;
  settings: ISettings
}

type SettingsParameter = { [key: string]: boolean | number | string };

const Settings: React.FC<IProps> = ({
  open, handleOnClose, changeSettings, settings,
}) => {
  const classes = useStyles();

  const changeOneSettingsParameter = (param: SettingsParameter) => {
    changeSettings({ ...settings, ...param });
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="title"
      disableBackdropClick
      disableEscapeKeyDown
      transitionDuration={1000}
      className={classes.root}
    >
      <DialogContent>
        <Typography variant="h6" className={classes.title}>
          Settings
        </Typography>
        <List>
          <ListItem className={classes.listItem}>
            <ListItemText
              className={classes.listItem__label}
              primary="Application music ON/OFF"
            />
            <Switcher
              name="applicationMusic"
              value={settings.applicationMusic}
              changeOneSettingsParameter={changeOneSettingsParameter}
            />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText
              className={classes.listItem__label}
              primary="Application music volume"
            />
            <SettingsSlider
              name="applicationMusicVolume"
              value={settings.applicationMusicVolume}
              min={0}
              max={10}
              step={1}
              marks={false}
              changeOneSettingsParameter={changeOneSettingsParameter}
            />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText
              className={classes.listItem__label}
              primary="Game music ON/OFF"
            />
            <Switcher
              name="gameMusic"
              value={settings.gameMusic}
              changeOneSettingsParameter={changeOneSettingsParameter}
            />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText
              className={classes.listItem__label}
              primary="Game music volume"
            />
            <SettingsSlider
              name="gameMusicVolume"
              value={settings.gameMusicVolume}
              min={0}
              max={10}
              step={1}
              marks={false}
              changeOneSettingsParameter={changeOneSettingsParameter}
            />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText
              className={classes.listItem__label}
              primary="Game sounds ON/OFF"
            />
            <Switcher
              name="gameSounds"
              value={settings.gameSounds}
              changeOneSettingsParameter={changeOneSettingsParameter}
            />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText
              className={classes.listItem__label}
              primary="Game sounds volume"
            />
            <SettingsSlider
              name="gameSoundsVolume"
              value={settings.gameSoundsVolume}
              min={0}
              max={10}
              step={1}
              marks={false}
              changeOneSettingsParameter={changeOneSettingsParameter}
            />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText
              className={classes.listItem__label}
              primary="Snake growth"
            />
            <Switcher
              name="snakeGrowth"
              value={settings.snakeGrowth}
              changeOneSettingsParameter={changeOneSettingsParameter}
            />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText
              className={classes.listItem__label}
              primary="Snake speed"
            />
            <SettingsSlider
              name="snakeSpeed"
              value={settings.snakeSpeed}
              min={1}
              max={5}
              step={1}
              marks
              changeOneSettingsParameter={changeOneSettingsParameter}
            />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText
              className={classes.listItem__label}
              primary="Game field color"
            />
            <ColorPicker
              name="snakeFieldColor"
              value={settings.snakeFieldColor}
              changeOneSettingsParameter={changeOneSettingsParameter}
            />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText
              className={classes.listItem__label}
              primary="Snake body color"
            />
            <ColorPicker
              name="snakeBodyColor"
              value={settings.snakeBodyColor}
              changeOneSettingsParameter={changeOneSettingsParameter}
            />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText
              className={classes.listItem__label}
              primary="Snake head color"
            />
            <ColorPicker
              name="snakeHeadColor"
              value={settings.snakeHeadColor}
              changeOneSettingsParameter={changeOneSettingsParameter}
            />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleOnClose}
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Settings;
