/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import request from '../../services/request';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    textAlign: 'center',
  },
  statistics: {
    width: 400,
  },
  statistics__list: {
    boxShadow: '0 0 10px 10px #ffffff6e',
  },
  statistics__listItem: {
    padding: 0,
  },
  statistics__headerBlock: {
    padding: '5px 20px',
    border: '1px solid #dcdcdc8c',
    textAlign: 'center',
    backgroundColor: '#dcdcdc8c',
    '&:last-child': {
      width: '35%',
    },
    '&:first-child': {
      width: '65%',
    },
  },
  statistics__block: {
    padding: '5px 20px',
    border: '1px solid #dcdcdc8c',
    '&:last-child': {
      width: '35%',
      textAlign: 'right',
    },
    '&:first-child': {
      width: '65%',
      textAlign: 'left',
    },
  },
}));

interface IStats {
  _id: string;
  name: string;
  score: number;
}

interface IProps {
  open: boolean;
  handleOnClose: () => void;
}

const Statistics: React.FC<IProps> = ({ open, handleOnClose }) => {
  const classes = useStyles();

  const [data, setData] = useState<IStats[]>([]);

  useEffect(() => {
    const getStatistics = async () => {
      const statsData = await request.get();
      if (typeof statsData !== 'string') {
        setData(statsData);
      }
    };

    getStatistics();
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
        <Grid container spacing={2} className={classes.statistics}>
          <Grid item xs={12} md={12}>
            <Typography variant="h6" className={classes.title}>
              Statistics
            </Typography>
            <List className={classes.statistics__list}>
              <ListItem className={classes.statistics__listItem}>
                <p className={classes.statistics__headerBlock}>
                  Name
                </p>
                <p className={classes.statistics__headerBlock}>
                  Score
                </p>
              </ListItem>
              { data.length
                ? data.map((item) => {
                  const { _id: id } = item;
                  return (
                    <ListItem key={id} className={classes.statistics__listItem}>
                      <p className={classes.statistics__block}>
                        {item.name}
                      </p>
                      <p className={classes.statistics__block}>
                        {item.score}
                      </p>
                    </ListItem>
                  );
                }) : (
                  <p>
                    No data
                  </p>
                )}
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

export default Statistics;
