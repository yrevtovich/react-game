import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles(() => createStyles({
  root: {
    padding: 0,
    width: 50,
    '& input': {
      height: 30,
    },
  },
}));

interface IProps {
  name: string;
  value: string;
  changeOneSettingsParameter: (param: SettingsParameter) => void;
}

type SettingsParameter = { [key: string]: string };

const ColorPicker: React.FC<IProps> = ({
  name, value, changeOneSettingsParameter,
}) => {
  const classes = useStyles();

  const [state, setState] = useState<string>(value);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setState(newValue);
  };

  const handleOnBlur = () => {
    changeOneSettingsParameter({ [name]: state });
  };

  return (
    <Input
      className={classes.root}
      type="color"
      value={state}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      disableUnderline
    />
  );
};

export default ColorPicker;
