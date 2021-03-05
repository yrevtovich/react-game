import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import VolumeSlider from '../VolumeSlider/VolumeSlider';
import Switcher from '../Switcher/Switcher';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    margin: theme.spacing(2, 0, 2),
    textAlign: 'center',
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
interface IProps {
  open: boolean;
  handleOnClose: () => void;
  changeSettings: (newSettings: ISettings) => void;
  settings: ISettings
}

type SettingsParameter = { [key: string]: boolean | number };

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
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography variant="h6" className={classes.title}>
              Settings
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Application music ON/OFF"
                />
                <Switcher
                  name="applicationMusic"
                  value={settings.applicationMusic}
                  changeOneSettingsParameter={changeOneSettingsParameter}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Application music volume"
                />
                <VolumeSlider
                  name="applicationMusicVolume"
                  value={settings.applicationMusicVolume}
                  changeOneSettingsParameter={changeOneSettingsParameter}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Game music ON/OFF"
                />
                <Switcher
                  name="gameMusic"
                  value={settings.gameMusic}
                  changeOneSettingsParameter={changeOneSettingsParameter}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Game music volume"
                />
                <VolumeSlider
                  name="gameMusicVolume"
                  value={settings.gameMusicVolume}
                  changeOneSettingsParameter={changeOneSettingsParameter}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Game sounds ON/OFF"
                />
                <Switcher
                  name="gameSounds"
                  value={settings.gameSounds}
                  changeOneSettingsParameter={changeOneSettingsParameter}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Game sounds volume"
                />
                <VolumeSlider
                  name="gameSoundsVolume"
                  value={settings.gameSoundsVolume}
                  changeOneSettingsParameter={changeOneSettingsParameter}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
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
