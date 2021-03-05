import React from 'react';

export interface ICoordinates {
  x: number, y: number
}

export interface IDirections {
  [key: string]: ICoordinates;
}
export interface ISettings {
  applicationMusic: boolean;
  applicationMusicVolume: number;
  gameMusic: boolean;
  gameMusicVolume: number;
  gameSounds: boolean;
  gameSoundsVolume: number;
  snakeSpeed: number;
  snakeHeadColor: string;
  snakeBodyColor: string;
  snakeFieldColor: string;
  snakeFoodColor: string;
  snakeGrowth: boolean;
}

export interface IGameBoardProps {
  food : ICoordinates;
  snake: ICoordinates[];
  isFullScreen: boolean;
  handleOnKeydown?: (e: React.KeyboardEvent) => void;
  children?: React.ReactNode;
  isGameFinished: boolean;
  settings: ISettings;
}
export interface IGameFieldProps {
  openMenu: () => void;
}

export interface IScore {
  name: string;
  score: number;
}
