export const LEVELS = [
  'contentMaker',
  'sourceContent',
  'excerpt',
  'sourceCard',
];

export const getChild = level =>
  LEVELS[LEVELS.findIndex(i => i.toLowerCase() === level.toLowerCase()) + 1];
