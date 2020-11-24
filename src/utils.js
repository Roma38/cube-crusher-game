const COLORS = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
  'brown',
  'grey',
  'black',
];
export const ROUND_TIME = 60;
export const PLAYGROUND_SIZE = { width: 500, height: 500 };
export const CUBE_SIZE = { width: 20, height: 20 };

let id = 0;


export function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function cubesFactory(quantitie) {
  const cubes = []
  for (let i = 0; i < quantitie; i++) {
    id++;
    cubes.push({
      id,
      color: COLORS[getRandomNumber(0, COLORS.length - 1)],
      top: getRandomNumber(0, PLAYGROUND_SIZE.height - CUBE_SIZE.height),
      left: getRandomNumber(0, PLAYGROUND_SIZE.width - CUBE_SIZE.width)
    })
  }

  return cubes;
}