/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import constants from '../../constants';
import { IGameBoardProps } from '../../interfaces';
import './gameBoard.css';

const GameBoard: React.FC<IGameBoardProps> = ({
  food,
  snake,
  handleOnKeydown,
  isFullScreen,
  isGameFinished,
  settings,
}) => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null | undefined>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { CELL_SIZE, BOARD_WIDTH, BOARD_HEIGHT } = constants;

  const drawFood = useCallback(() => {
    if (!ctx) {
      return;
    }

    const color: string = settings.snakeFoodColor;
    ctx.fillStyle = color;

    const { x, y } = food;
    ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
  }, [CELL_SIZE, ctx, food]);

  const drawSnake = useCallback((): void => {
    if (!ctx) {
      return;
    }

    snake.forEach((piece, index) => {
      const { x, y } = piece;

      if (!index) {
        ctx.fillStyle = settings.snakeHeadColor;
        ctx.fillRect(x + 2, y + 2, CELL_SIZE - 4, CELL_SIZE - 4);
      } else {
        ctx.fillStyle = settings.snakeBodyColor;
        ctx.fillRect(x + 2, y + 2, CELL_SIZE - 4, CELL_SIZE - 4);
      }
    });
  }, [CELL_SIZE, ctx, snake, settings]);

  const drawField = useCallback((): void => {
    if (!ctx) {
      return;
    }

    ctx.fillStyle = settings.snakeFieldColor;
    ctx.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
  }, [settings, BOARD_HEIGHT, BOARD_WIDTH, ctx]);

  const draw = useCallback(() => {
    if (!ctx) {
      return;
    }

    drawField();
    drawFood();
    drawSnake();
  }, [ctx, drawField, drawFood, drawSnake]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gameContext = canvas?.getContext('2d');

    setCtx(gameContext);
  }, []);

  useEffect(() => {
    const focusCanvas = () => {
      if (!isGameFinished) {
        canvasRef.current?.focus();
      }
    };

    window.addEventListener('keydown', focusCanvas);
    return () => window.removeEventListener('keydown', focusCanvas);
  }, [isGameFinished, handleOnKeydown]);

  useEffect(() => {
    draw();
    canvasRef.current?.focus();
  }, [food, snake, draw]);

  return (
    <canvas
      className={isFullScreen ? 'fullscreen' : 'canvas'}
      width={BOARD_WIDTH}
      height={BOARD_HEIGHT}
      ref={canvasRef}
      onKeyDown={handleOnKeydown}
      tabIndex={0}
    />
  );
};

export default GameBoard;
