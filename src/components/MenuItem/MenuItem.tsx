import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { IMenuItem } from '../../interfaces';

const MenuItem: React.FC<IMenuItem> = ({ text, onClick }) => {
  const handlerOnClick = () => {
    onClick(text);
  };

  return (
    <ListItem
      button
      onClick={handlerOnClick}
    >
      <ListItemText
        primary={text}
      />
    </ListItem>
  );
};

export default MenuItem;
