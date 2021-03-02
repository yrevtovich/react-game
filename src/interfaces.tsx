import React from 'react';

export interface ICoordinates {
  x: number, y: number
}

export interface IDirections {
  [key: string]: ICoordinates;
}

export interface IGameField {
  time: number;
  snake: ICoordinates[];
}

export interface IGameBoardProps {
  food : ICoordinates;
  snake: ICoordinates[];
  handleOnKeydown?: (e: React.KeyboardEvent) => void;
  children?: React.ReactNode;
}
export interface IGameOverModal {
  open: boolean;
  score: number;
  restart: () => void;
  openMenu: () => void;
  children?: React.ReactNode;
}

export interface IMenu {
  list?: string[];
  menuItemClick: (newOpened: string) => void;
  children?: React.ReactNode;
}
export interface IMenuItem {
  text: string;
  onClick: (newOpened: string) => void;
  children?: React.ReactNode;
}

export interface IGameFieldProps {
  openMenu: () => void;
}
