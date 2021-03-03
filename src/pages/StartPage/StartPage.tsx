import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => createStyles({
  root: {
    width: '100%',
    height: '100%',
    backgroundImage: 'url(./assets/images/start_page.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    fontSize: 55,
    color: '#f44336',
  },
}));

interface IProps {
  close: () => void
}

const StartPage: React.FC<IProps> = ({ close }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        color="primary"
        className={classes.button}
        onClick={close}
      >
        start game
      </Button>
    </div>
  );
};

export default StartPage;
