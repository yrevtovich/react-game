import React, { useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';

// const useStyles = makeStyles((theme: Theme) => createStyles({
//   root: {
//     flexGrow: 1,
//     maxWidth: 752,
//     display: 'flex',
//   },
//   demo: {
//     backgroundColor: theme.palette.background.paper,
//   },
//   title: {
//     margin: theme.spacing(4, 0, 2),
//   },
// }));

interface IProps {
  onClick: () => void,
  children: React.ReactNode,
}

const GameHeaderButton: React.FC<IProps> = ({ children, onClick }) => {
  console.log('dd');
  return (
    <IconButton color="primary" component="span" onClick={onClick}>
      {children}
    </IconButton>
  );
};

export default GameHeaderButton;
