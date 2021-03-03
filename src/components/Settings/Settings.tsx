/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import VolumeSlider from '../VolumeSlider/VolumeSlider';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

interface IScore {
  name: string;
  score: number;
}

interface IProps {
  open: boolean;
  handleOnClose: () => void;
}

type Storage = string | undefined;

const Settings: React.FC<IProps> = ({ open, handleOnClose }) => {
  const [data, setData] = useState<IScore[]>([]);

  const classes = useStyles();

  useEffect(() => {
    const stats = localStorage.snakeStats as Storage;
    if (stats) {
      const statsData = JSON.parse(stats) as IScore[];
      setData(statsData);
    }
  }, []);

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
                  primary="Menu music ON/OFF"
                />
                <Checkbox checked />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Menu music volume"
                />
                <VolumeSlider />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Game music ON/OFF"
                />
                <Checkbox checked />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Menu music volume"
                />
                <VolumeSlider />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Game music ON/OFF"
                />
                <Checkbox checked />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Menu music volume"
                />
                <VolumeSlider />
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
