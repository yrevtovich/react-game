/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '../MenuItem/MenuItem';
import { IMenu } from '../../interfaces';
import menuSound from '../../assets/audio/menu_music.mp3';
// src\assets\audio\menu_music.mp3

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

const Menu: React.FC<IMenu> = ({ list = [], menuItemClick }) => {
  const classes = useStyles();

  // useEffect(() => {
  //   const audio = new Audio(menuSound);
  //   audio.loop = true;
  //   audio.play();
  //   return () => audio.pause();
  // }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography variant="h6" className={classes.title}>
            MENU
          </Typography>
          <List>
            {list.map<React.ReactNode | null>((item: string) => (
              <MenuItem
                text={item}
                onClick={menuItemClick}
                key={item}
              />
            ))}
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default Menu;
