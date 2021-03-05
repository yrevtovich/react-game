import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  slider: {
    marginLeft: 30,
    marginRight: 10,
    width: '65%',
    minWidth: '50%',
  },
});

type SettingsParameter = { [key: string]: number };

interface IProps {
  name: string;
  value: number;
  min: number;
  max: number;
  step: number;
  marks: boolean;
  changeOneSettingsParameter: (param: SettingsParameter) => void;
}

const VolumeSlider: React.FC<IProps> = ({
  name, value, min, max, step, marks, changeOneSettingsParameter,
}) => {
  const classes = useStyles();
  const [state, setState] = useState<number>(value);

  const handleChange = (event: any, newValue: number | number[]) => {
    setState(newValue as number);
    changeOneSettingsParameter({ [name]: newValue as number });
  };

  return (
    <div className={classes.root}>
      <Slider
        min={min}
        max={max}
        step={step}
        marks={marks}
        value={state}
        className={classes.slider}
        onChange={handleChange}
      />
      <p>
        {state}
      </p>
    </div>
  );
};

export default VolumeSlider;
