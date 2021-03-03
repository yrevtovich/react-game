import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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

const VolumeSlider: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = useState<number>(5);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <div className={classes.root}>
      <Slider
        min={0}
        max={10}
        value={value}
        className={classes.slider}
        onChange={handleChange}
      />
      <p>
        {value}
      </p>
    </div>
  );
};

export default VolumeSlider;
