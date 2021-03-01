export interface ICoordinates {
  x: number, y: number
}

export interface IDirections {
  [key: string]: ICoordinates,
}

export interface IGameField {
  time: number,
  snake: ICoordinates[],
}

export interface IProps {
  food : ICoordinates,
  snake: ICoordinates[],
  handleOnKeydown: (e: React.KeyboardEvent) => void;
  children?: React.ReactNode,
}
