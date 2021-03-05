/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import GameBoard from '../GameBoard/GameBoard';
import GameOverModal from '../GameOverModal/GameOverModal';
import constants from '../../constants';
import { ICoordinates, IDirections, ISettings } from '../../interfaces';
import GameHeader from '../GameHeader/GameHeader';

import menuSoundFile from '../../assets/audio/menu_music.mp3';
import gameMusicFile from '../../assets/audio/game_music.mp3';
import eatSoundFile from '../../assets/audio/eat.mp3';
import incorrectSoundFile from '../../assets/audio/incorrect.mp3';

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
  settings: ISettings;
}

interface ISavedData {
  snake: ICoordinates[];
  food: ICoordinates;
  score: number;
  isGameInProgress: boolean;
  isGameFinished: boolean;
  direction: ICoordinates;
}

const Game: React.FC<IProps> = ({
  toggleStatistics,
  toggleSettings,
  toggleKeyboardKeys,
  settings,
}) => {
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
  const [audio] = useState<HTMLAudioElement>(new Audio());
  const [snakeSpeed, setSnakeSpeed] = useState<number>(settings.snakeSpeed);

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
    setSnakeSpeed(settings.snakeSpeed);
  };

  const closeGameOverModal = () => {
    setIsGameOverModal(false);
  };

  const playSound = (soundUrl: string) => {
    const { gameSounds, gameSoundsVolume } = settings;

    if (!gameSounds) {
      return;
    }
    const newAudio = new Audio(soundUrl);
    newAudio.volume = gameSoundsVolume / 10;
    newAudio.play();
  };

  const finishGame = () => {
    playSound(incorrectSoundFile);
    setTimeout(() => {
      setIsGameInProgress(false);
    }, 2000);
    audio.pause();
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
      playSound(eatSoundFile);

      const newSnake = settings.snakeGrowth
        ? [newHeadCoordinates, ...snake]
        : [newHeadCoordinates, ...snake.slice(0, -1)];

      setSnake(newSnake);
      setScore((state) => state + 1);
      getNewFood();
    } else {
      setSnake([newHeadCoordinates, ...snake.slice(0, -1)]);
    }
  };

  const stopGame = () => {
    setIsGameInProgress(false);
  };

  const changeAudioParameters = (file: string, volume: number) => {
    const srcRegExp = new RegExp(`${file}`);

    if (!srcRegExp.exec(audio.src)) {
      audio.src = file;
    }

    audio.volume = volume / 10;
  };

  useEffect(() => {
    const data = localStorage.getItem('snakeGameData');

    if (data) {
      const savedData = JSON.parse(data) as ISavedData;
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
    const {
      applicationMusic,
      applicationMusicVolume,
      gameMusicVolume,
      gameMusic,
    } = settings;

    if ((!gameMusic && !applicationMusic)
      || (!applicationMusic && !isGameInProgress)
      || (!gameMusic && isGameInProgress)
    ) {
      audio.pause();
      return;
    }

    if (isGameInProgress) {
      changeAudioParameters(gameMusicFile, gameMusicVolume);
    } else {
      changeAudioParameters(menuSoundFile, applicationMusicVolume);
    }

    audio.loop = true;

    if (audio.paused) {
      audio.play();
    }
  }, [isGameInProgress, settings]);

  useEffect(() => {
    if (!isGameInProgress) {
      return undefined;
    }

    const timeoutId = setTimeout(move, 500 / snakeSpeed);
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
      window.removeEventListener('beforeunload', save);
      clearTimeout(timeoutId);
    };
  }, [snake, isGameInProgress, food, score, isGameFinished, snakeSpeed]);

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
        settings={settings}
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
