import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import request from '../../services/request';

interface IScore {
  name: string;
  score: number;
}

interface IProps {
  open: boolean;
  score: number;
  restart: () => void;
  close: () => void;
  children?: React.ReactNode;
}

const GameOverModal: React.FC<IProps> = ({
  open, score, restart, close,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isEmpty, setIsEmpty] = useState(true);

  const saveStatistics = async (): Promise<void> => {
    const currentScore: IScore = { name: inputValue, score };
    await request.post(currentScore);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (e.target.value.trim()) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  };

  const handleOnClickRestartButton = async () => {
    await saveStatistics();
    restart();
  };

  const handleOnClose = async () => {
    await saveStatistics();
    close();
  };

  useEffect(() => {
    if (!open) {
      setInputValue('');
      setIsEmpty(true);
    }
  }, [open, setInputValue]);

  return (
    <Dialog
      open={open}
      aria-labelledby="title"
      disableBackdropClick
      disableEscapeKeyDown
      transitionDuration={1000}
    >
      <DialogTitle id="title">Game Over</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`You scored ${score} points. Please, enter your name:`}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          value={inputValue}
          label="Enter your name"
          fullWidth
          onChange={handleOnChange}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleOnClickRestartButton}
          color="primary"
          disabled={isEmpty}
        >
          Play again
        </Button>
        <Button
          onClick={handleOnClose}
          color="primary"
          disabled={isEmpty}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameOverModal;
