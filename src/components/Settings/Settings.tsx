/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import VolumeSlider from '../VolumeSlider/VolumeSlider';
// import { IScore } from '../../interfaces';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    maxWidth: 752,
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

type Storage = string | undefined;

const Settings: React.FC = () => {
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
    <div className={classes.root}>
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
    </div>
  );
};

export default Settings;
