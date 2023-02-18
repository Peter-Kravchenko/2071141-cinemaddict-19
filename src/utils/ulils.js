import dayjs from 'dayjs';

const RELEASE_FORMAT = 'YYYY';

export const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

export const humanizeReleazeDate = (date) => date ? dayjs(date).format(RELEASE_FORMAT) : '';

