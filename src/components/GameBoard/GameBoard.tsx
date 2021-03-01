import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import constants from '../../constants';
import './gameBoard.css';

interface ICoordinates {
  x: number, y: number
}

interface IProps {
  food : ICoordinates,
  snake: ICoordinates[],
  handleOnKeydown: (e: React.KeyboardEvent) => void;
  children?: React.ReactNode,
}

const GameBoard: React.FC<IProps> = ({ food, snake, handleOnKeydown }) => {
  const {
    STEP, CELL_SIZE, BOARD_WIDTH, BOARD_HEIGHT, BOARD_COLOR,
  } = constants;

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null | undefined>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawFood = useCallback(() => {
    if (!ctx) {
      return;
    }

    ctx.fillStyle = 'red';

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
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x + 2, y + 2, CELL_SIZE - 4, CELL_SIZE - 4);
      } else {
        ctx.fillStyle = 'blue';
        ctx.fillRect(x + 2, y + 2, CELL_SIZE - 4, CELL_SIZE - 4);
      }
    });
  }, [CELL_SIZE, ctx, snake]);

  const drawField = useCallback((): void => {
    if (!ctx) {
      return;
    }

    ctx.fillStyle = BOARD_COLOR;
    ctx.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
  }, [BOARD_COLOR, BOARD_HEIGHT, BOARD_WIDTH, ctx]);

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
    draw();
  }, [food, snake, draw]);

  return (
    <>
      <canvas
        width={BOARD_WIDTH}
        height={BOARD_HEIGHT}
        ref={canvasRef}
        onKeyDown={handleOnKeydown}
        tabIndex={0}
      />
    </>
  );
};

export default GameBoard;
