export default {
  STEP: 2,
  CELL_SIZE: 20,
  BOARD_COLOR: '#50b943',
  BOARD_WIDTH: 780,
  BOARD_HEIGHT: 480,
  SNAKE_LENGTH: 4,
  DEFAULT_SETTINGS: {
    applicationMusic: true,
    applicationMusicVolume: 5,
    gameMusic: true,
    gameMusicVolume: 5,
    gameSounds: true,
    gameSoundsVolume: 5,
    snakeSpeed: 2,
    snakeHeadColor: '#ffff00',
    snakeBodyColor: '#0000ff',
    snakeFieldColor: '#50b943',
    snakeFoodColor: '#ff0000',
    snakeGrowth: true,
  },
  KEYBOARD_KEYS: [
    {
      key: 'Arrow left',
      description: 'Move left',
    },
    {
      key: 'Arrow right',
      description: 'Move right',
    },
    {
      key: 'Arrow up',
      description: 'Move up',
    },
    {
      key: 'Arrow down',
      description: 'Move down',
    },
    {
      key: 'Space',
      description: 'Pause/continue game',
    },
    {
      key: 'F9',
      description: 'Activate/deactivate fullscreen',
    },
  ],
};
