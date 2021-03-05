const makeStep = (coordinate: number, destinationCoordinate: number, step: number): number => {
  if (coordinate < destinationCoordinate) {
    return coordinate + step;
  }

  if (coordinate > destinationCoordinate) {
    return coordinate - step;
  }

  return coordinate;
};

export default makeStep;
