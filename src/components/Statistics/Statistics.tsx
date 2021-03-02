/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
// import { IScore } from '../../interfaces';
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

interface IScore {
  name: string;
  score: number;
}

type Storage = string | undefined;
// type Stats = boolean | IScore[];

const Statistics: React.FC = () => {
  const classes = useStyles();

  const [data, setData] = useState<IScore[]>([]);

  // let data: IScore[] = [];

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
            Statistics
          </Typography>
          <List>
            <ListItem>
              <p>
                Name
              </p>
              <p>
                Score
              </p>
            </ListItem>
            { data.length && data.map((item) => (
              <ListItem key={item.name}>
                <p>
                  {item.name}
                </p>
                <p>
                  {item.score}
                </p>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default Statistics;
