export const COLS = 10;
export const ROWS = 20;
export const BLOCK_SIZE = 30;

export class KEY {
    static readonly LEFT = 37;
    static readonly RIGHT = 39;
    static readonly DOWN = 40;
    static readonly UP = 38;
    static readonly SPACE = 32;
}

export const COLORS = [
    'none',
    'rgba(0, 255, 255)',
    'rgba(0, 0, 255)',
    'rgba(255, 132, 0)',
    'rgba(255, 255, 0)',
    'rgba(0, 255, 0)',
    'rgba(255, 0, 255)',
    'rgba(255, 0, 0)',
];


export const SHAPES = [
    [],
    [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[2, 0, 0], [2, 2, 2], [0, 0, 0]],
    [[0, 0, 3], [3, 3, 3], [0, 0, 0]],
    [[4, 4], [4, 4]],
    [[0, 5, 5], [5, 5, 0], [0, 0, 0]],
    [[0, 6, 0], [6, 6, 6], [0, 0, 0]],
    [[7, 7, 0], [0, 7, 7], [0, 0, 0]]
];