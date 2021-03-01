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
import constants from '../../constants';
import './gameField.css';

interface IGameField {
  time: number,
  snake: ISnake[],
}

interface ISnake {
  x: number, y: number
}

interface IDirections {
  [key: string]: ISnake,
}

const GameField: React.FC = () => {
  const { STEP, CELL_SIZE } = constants;

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null | undefined>(null);
  // const [gameField, setGameField] = useState<IGameField>({
  //   time: 0,
  //   snake: [{ x: 0, y: 0 }],
  // });
  // const [time, setTime] = useState(0);
  const [direction, setDirection] = useState<ISnake>({ x: STEP, y: 0 });
  const [snake, setSnake] = useState<ISnake[]>([
    { x: 90, y: 0 },
    { x: 60, y: 0 },
    { x: 30, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [food, setFood] = useState<ISnake>({ x: 0, y: 0 });
  // const [destination, setDestination] = useState<ISnake[]>([{ x: 0, y: 30 }]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const boardWidth = 780;
  const boardHeight = 480;
  const boardColor = '#50b943';
  // const step = 30;

  // let snakeLength = 4;

  const drawFood = () => {
    if (!ctx) {
      return;
    }

    ctx.fillStyle = 'red';

    const { x, y } = food;
    ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
  };

  const drawSnake = (): void => {
    if (!ctx) {
      return;
    }

    ctx.fillStyle = 'blue';

    snake.forEach((piece) => {
      const { x, y } = piece;
      ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
    });
  };

  const drawField = (): void => {
    if (!ctx) {
      return;
    }

    ctx.fillStyle = boardColor;
    ctx.fillRect(0, 0, boardWidth, boardHeight);
  };

  const draw = () => {
    if (!ctx) {
      return;
    }

    drawField();
    drawFood();
    drawSnake();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const gameContext = canvas?.getContext('2d');

    setCtx(gameContext);

    setSnake(() => ([
      { x: 90, y: 0 },
      { x: 60, y: 0 },
      { x: 30, y: 0 },
      { x: 0, y: 0 },
    ]));

    getNewFood();
  }, []);

  const move = (): void => {
    const headCoordinates = snake[0];
    const newHeadCoordinates = {
      x: headCoordinates.x + direction.x,
      y: headCoordinates.y + direction.y,
    };

    const isFoodCell = compareCoordinates(newHeadCoordinates, food);

    if (isFoodCell) {
      setSnake([newHeadCoordinates, ...snake]);
      getNewFood();
    } else {
      setSnake([newHeadCoordinates, ...snake.slice(0, -1)]);
    }
  };

  const loop = () => {
    move();
    draw();
  };

  const finishGame = () => {
    console.log('finish');
  };

  const getRandomCoordinate = (fieldSize: number, cellSize: number): number => {
    return Math.floor(Math.random() * (fieldSize / cellSize)) * cellSize;
  };

  const compareCoordinates = (first: ISnake, second: ISnake): boolean => {
    return first.x === second.x && first.y === second.y;
  };

  const getNewFood = () => {
    const foodCoordinates = {
      x: getRandomCoordinate(boardWidth, CELL_SIZE),
      y: getRandomCoordinate(boardHeight, CELL_SIZE),
    };

    const isEmptyCell = !snake.some((piece) => compareCoordinates(piece, foodCoordinates));

    if (!isEmptyCell) {
      getNewFood();
    } else {
      setFood(foodCoordinates);
    }
  };

  const getNewDirection = (key: string, step: number): ISnake | undefined => {
    const directions: IDirections = {
      ArrowRight: { x: step, y: 0 },
      ArrowLeft: { x: -step, y: 0 },
      ArrowUp: { x: 0, y: -step },
      ArrowDown: { x: 0, y: step },
    };

    return directions[key];
  };
  const handleOnKeydown = (e: React.KeyboardEvent): void => {
    const newDirection = getNewDirection(e.key, STEP);

    if (
      !newDirection
      || (direction.x && newDirection.x)
      || (direction.y && newDirection.y)
      || (direction.x === newDirection.x && direction.y === newDirection.y)
    ) {
      return;
    }
    setDirection(newDirection);
  };

  useEffect(() => {
    if (snake[0].x + CELL_SIZE > boardWidth || snake[0].y + CELL_SIZE > boardHeight
      || snake[0].x < 0 || snake[0].y < 0) {
      finishGame();
      return;
    }

    canvasRef.current?.focus();
    console.log('loop');

    const timeoutId = setTimeout(loop, 700);
    return () => clearTimeout(timeoutId);
  }, [snake]);

  return (
    <>
      <canvas
        width={boardWidth}
        height={boardHeight}
        ref={canvasRef}
        onKeyDown={handleOnKeydown}
        tabIndex={0}
      />
    </>
  );
};

export default GameField;
