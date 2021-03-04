/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import GameBoard from '../GameBoard/GameBoard';
import GameOverModal from '../GameOverModal/GameOverModal';
import constants from '../../constants';
import { ICoordinates, IDirections } from '../../interfaces';
import GameHeader from '../GameHeader/GameHeader';

import './game.css';

let direction = {
  x: constants.CELL_SIZE,
  y: 0,
};

const setDirection = (newDirection: ICoordinates): void => {
  direction = newDirection;
};

interface IProps {
  toggleStatistics: () => void;
  toggleSettings: () => void;
  toggleKeyboardKeys: () => void;
}

interface ISavedData {
  snake: ICoordinates[];
  food: ICoordinates;
  score: number;
  isGameInProgress: boolean;
  isGameFinished: boolean;
  direction: ICoordinates;
}

const Game: React.FC<IProps> = ({ toggleStatistics, toggleSettings, toggleKeyboardKeys }) => {
  const {
    CELL_SIZE, BOARD_WIDTH, BOARD_HEIGHT,
  } = constants;
  const [snake, setSnake] = useState<ICoordinates[]>([
    { x: 90, y: 0 },
    { x: 60, y: 0 },
    { x: 30, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [food, setFood] = useState<ICoordinates>({ x: 0, y: 0 });
  const [score, setScore] = useState<number>(0);
  const [isGameInProgress, setIsGameInProgress] = useState<boolean>(false);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const [isGameOverModal, setIsGameOverModal] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreeen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreeen((state) => !state);
  };

  const getRandomCoordinate = (fieldSize: number, cellSize: number): number => (
    Math.floor(Math.random() * (fieldSize / cellSize)) * cellSize);

  const compareCoordinates = (first: ICoordinates, second: ICoordinates): boolean => (
    first.x === second.x && first.y === second.y);

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

  const startNewGame = () => {
    setScore(0);
    setSnake(() => ([
      { x: 60, y: 0 },
      { x: 40, y: 0 },
      { x: 20, y: 0 },
      { x: 0, y: 0 },
    ]));

    setDirection({
      x: constants.CELL_SIZE,
      y: 0,
    });

    setIsGameOverModal(false);

    getNewFood();
    setIsGameInProgress(true);
    setIsGameFinished(false);
  };

  const closeGameOverModal = () => {
    setIsGameOverModal(false);
  };

  const finishGame = () => {
    setIsGameFinished(true);
    setIsGameOverModal(true);
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

  const changeDirection = (key: string) => {
    const newDirection = getNewDirection(key, CELL_SIZE);

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
  };

  const toggleIsGameInProgress = () => {
    if (isGameFinished) {
      return;
    }

    setIsGameInProgress((state) => !state);
  };

  const handleOnKeydown = (e: React.KeyboardEvent): void => {
    changeDirection(e.key);

    if (e.code === 'Space') {
      toggleIsGameInProgress();
    }

    if (e.code === 'F9') {
      toggleFullScreen();
    }
  };

  const checkGame = (coordinates: ICoordinates): boolean => {
    if (coordinates.x >= BOARD_WIDTH || coordinates.y >= BOARD_HEIGHT
      || (coordinates.x < 0) || coordinates.y < 0) {
      return true;
    }
    return false;
  };

  const move = (): void => {
    const headCoordinates = snake[0];
    const newHeadCoordinates = {
      x: headCoordinates.x + direction.x,
      y: headCoordinates.y + direction.y,
    };

    const isSnakeCell = snake.some((piece) => compareCoordinates(newHeadCoordinates, piece));
    const isBoardCrossed = checkGame(newHeadCoordinates);

    if (isSnakeCell || isBoardCrossed) {
      finishGame();
      return;
    }

    const isFoodCell = compareCoordinates(newHeadCoordinates, food);

    if (isFoodCell) {
      setSnake([newHeadCoordinates, ...snake]);
      setScore((state) => state + 1);
      getNewFood();
    } else {
      setSnake([newHeadCoordinates, ...snake.slice(0, -1)]);
    }
  };

  const loop = () => {
    move();
  };

  const stopGame = () => {
    setIsGameInProgress(false);
  };

  useEffect(() => {
    const data = localStorage.snakeGameData;

    if (data) {
      const savedData: ISavedData = JSON.parse(data);
      setSnake(savedData.snake);
      setFood(savedData.food);
      setDirection(savedData.direction);
      setIsGameFinished(savedData.isGameFinished);
      setIsGameInProgress(false);
    } else {
      startNewGame();
      setIsGameInProgress(false);
    }
  }, []);

  useEffect(() => {
    if (!isGameInProgress) {
      return;
    }

    const timeoutId = setTimeout(loop, 200);
    const save = () => {
      const data = {
        snake,
        direction,
        food,
        score,
        isGameInProgress,
        isGameFinished,
      };

      localStorage.snakeGameData = JSON.stringify(data);
    };

    window.addEventListener('beforeunload', save);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('beforeunload', save);
    };
  }, [snake, direction, isGameInProgress]);

  return (
    <>
      <GameHeader
        toggleIsGameInProgress={toggleIsGameInProgress}
        startNewGame={startNewGame}
        toggleStatistics={toggleStatistics}
        toggleSettings={toggleSettings}
        stopGame={stopGame}
        toggleFullScreen={toggleFullScreen}
        toggleKeyboardKeys={toggleKeyboardKeys}
        isGameInProgress={isGameInProgress}
        score={score}
      />
      <GameBoard
        snake={snake}
        food={food}
        handleOnKeydown={handleOnKeydown}
        isFullScreen={isFullScreen}
        isGameFinished={isGameFinished}
      />
      <GameOverModal
        open={isGameOverModal}
        score={score}
        restart={startNewGame}
        close={closeGameOverModal}
      />
    </>
  );
};

export default Game;
