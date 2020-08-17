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

export class LEVELS {
    static readonly 1 = 720;
    static readonly 2 = 630;
    static readonly 3 = 550;
    static readonly 4 = 470;
    static readonly 5 = 380;
    static readonly 6 = 300;
    static readonly 7 = 220;
    static readonly 8 = 130;
    static readonly 9 = 100;
    static readonly 10 = 80;
    static readonly 11 = 80;
    static readonly 12 = 80;
    static readonly 13 = 70;
    static readonly 14 = 70;
    static readonly 15 = 70;
    static readonly 16 = 50;
    static readonly 17 = 50;
    static readonly 18 = 50;
    static readonly 19 = 30;
    static readonly 20 = 30;
}