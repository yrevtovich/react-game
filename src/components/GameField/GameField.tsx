/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect, useRef } from 'react';
import GameBoard from '../GameBoard/GameBoard';
import constants from '../../constants';
import { ICoordinates, IDirections, IGameField } from '../../interfaces';

import './gameField.css';

let direction = {
  x: constants.CELL_SIZE,
  y: 0,
};

const setDirection = (newDirection: ICoordinates): void => {
  direction = newDirection;
};

const GameField: React.FC = () => {
  const {
    STEP, CELL_SIZE, BOARD_WIDTH, BOARD_HEIGHT, BOARD_COLOR,
  } = constants;

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null | undefined>(null);
  // const [gameField, setGameField] = useState<IGameField>({
  //   time: 0,
  //   snake: [{ x: 0, y: 0 }],
  // });
  // const [time, setTime] = useState(0);
  // const [direction, setDirection] = useState<ICoordinates>({ x: CELL_SIZE, y: 0 });
  const [snake, setSnake] = useState<ICoordinates[]>([
    { x: 90, y: 0 },
    { x: 60, y: 0 },
    { x: 30, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [food, setFood] = useState<ICoordinates>({ x: 0, y: 0 });
  // const [timeout, setTimeoutId] = useState<NodeJS.Timeout>(setTimeout(() => {}, 0));
  // const [isGameStarted, setIsGameStarted] = useState();
  // const [destination, setDestination] = useState<ICoordinates[]>([{ x: 0, y: 0 }]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gameContext = canvas?.getContext('2d');

    setCtx(gameContext);

    setSnake(() => ([
      { x: 60, y: 0 },
      { x: 40, y: 0 },
      { x: 20, y: 0 },
      { x: 0, y: 0 },
    ]));

    getNewFood();
  }, []);

  const move = (): void => {
    // console.log(direction.x, direction.y, 'move');
    const headCoordinates = snake[0];
    const newHeadCoordinates = {
      x: headCoordinates.x + direction.x,
      y: headCoordinates.y + direction.y,
    };

    const isSnakeCell = snake.some((piece) => compareCoordinates(newHeadCoordinates, piece));

    if (isSnakeCell) {
      finishGame();
      return;
    }

    const isFoodCell = compareCoordinates(newHeadCoordinates, food);

    if (isFoodCell) {
      setSnake([newHeadCoordinates, ...snake]);
      getNewFood();
    } else {
      setSnake([newHeadCoordinates, ...snake.slice(0, -1)]);
    }
  };

  const finishGame = () => {
    console.log('finish');
  };

  const getRandomCoordinate = (fieldSize: number, cellSize: number): number => {
    return Math.floor(Math.random() * (fieldSize / cellSize)) * cellSize;
  };

  const compareCoordinates = (first: ICoordinates, second: ICoordinates): boolean => {
    return first.x === second.x && first.y === second.y;
  };

  const getNewFood = () => {
    const foodCoordinates = {
      x: getRandomCoordinate(BOARD_WIDTH, CELL_SIZE),
      y: getRandomCoordinate(BOARD_HEIGHT, CELL_SIZE),
    };

    const isEmptyCell = !snake.some((piece) => compareCoordinates(piece, foodCoordinates));

    if (!isEmptyCell) {
      getNewFood();
    } else {
      setFood(foodCoordinates);
    }
  };

  const getNewDirection = (key: string, step: number): ICoordinates | undefined => {
    const directions: IDirections = {
      ArrowRight: { x: step, y: 0 },
      ArrowLeft: { x: -step, y: 0 },
      ArrowUp: { x: 0, y: -step },
      ArrowDown: { x: 0, y: step },
    };

    return directions[key];
  };

  const handleOnKeydown = (e: React.KeyboardEvent): void => {
    const newDirection = getNewDirection(e.key, CELL_SIZE);

    if (
      !newDirection
      || (direction.x && newDirection.x)
      || (direction.y && newDirection.y)
      || (direction.x === newDirection.x && direction.y === newDirection.y)
      || (snake[0].x + newDirection.x === snake[1].x && snake[0].y + newDirection.y === snake[1].y)
    ) {
      return;
    }

    setDirection(newDirection);
    // console.log('change', newDirection, direction);
  };

  const checkGame = (): boolean => {
    if (snake[0].x + CELL_SIZE > BOARD_WIDTH || snake[0].y + CELL_SIZE > BOARD_HEIGHT
      || snake[0].x < 0 || snake[0].y < 0) {
      return true;
    }
    return false;
  };

  const loop = () => {
    move();
  };

  useEffect(() => {
    canvasRef.current?.focus();
    const isGameFinished = checkGame();

    if (isGameFinished) {
      finishGame();
      return;
    }

    const timeoutId = setTimeout(loop, 2000);
    // console.log('loop');
    return () => clearTimeout(timeoutId);
  }, [snake, direction]);

  return (
    <>
      <GameBoard
        snake={snake}
        food={food}
        handleOnKeydown={handleOnKeydown}
      />
    </>
  );
};

export default GameField;
