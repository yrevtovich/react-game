import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IGameOverModal } from '../../interfaces';

const GameOverModal: React.FC<IGameOverModal> = ({ open, score, restart }) => {
  // const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = useState<string>('');

  const handleClickOpen = () => {
    // setOpen(true);
  };

  const handleClose = () => {
    // setOpen(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setInputValue(e.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="title"
      disableBackdropClick
      disableEscapeKeyDown
      transitionDuration={1000}
    >
      <DialogTitle id="title">Game Over</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You scored
          {' '}
          {score}
          {' '}
          points. Please, enter your name:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          value={inputValue}
          // id="name"
          label="Enter your name"
          // type="email"
          fullWidth
          onChange={handleOnChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={restart as () => void} color="primary">
          Play again
        </Button>
        <Button onClick={handleClose} color="primary">
          Menu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameOverModal;
