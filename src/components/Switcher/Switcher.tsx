import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';

type SettingsParameter = { [key: string]: boolean };

interface IProps {
  name: string,
  value: boolean,
  changeOneSettingsParameter: (param: SettingsParameter) => void;
}

const Switcher: React.FC<IProps> = ({ name, value, changeOneSettingsParameter }) => {
  const [state, setState] = useState<boolean>(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setState(newValue);
    changeOneSettingsParameter({ [name]: newValue });
  };

  return (
    <Switch
      checked={state}
      onChange={handleChange}
      name={name}
      color="primary"
    />
  );
};

export default Switcher;
