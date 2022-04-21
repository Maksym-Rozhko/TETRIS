const preload = document.querySelector('.preload');
console.log(getComputedStyle(preload).opacity);
setTimeout(() => {
    preload.classList.add('hide');
}, 2500);
setTimeout(() => {
    preload.remove();
}, 5000);

const SIZE_BLOCK = 35;

// mechanics
const game = {
    area: [
        ['o','o','o','o','o','o','o','o','o','o'],
        ['o','o','o','o','o','o','o','o','o','o'],
        ['o','o','o','o','o','o','o','o','o','o'],
        ['o','o','o','o','o','o','o','o','o','o'],
        ['o','o','o','o','o','o','o','o','o','o'],
        ['o','o','o','o','o','o','o','o','o','o'],
        ['o','o','o','o','o','o','o','o','o','o'],
        ['o','o','o','o','o','o','o','o','o','o'],
        ['o','o','o','o','o','o','o','o','o','o'],
        ['o','o','o','o','o','o','o','o','o','o'],
        ['o','o','o','o','o','o','o','o','o','o'],
        ['o','o','o','o','o','o','o','o','o','o'],
        ['o','o','o','o','o','o','o','o','o','o'],
        ['o','o','o','o','o','o','o','o','o','o'],
        ['o','o','o','o','o','o','o','o','o','o'],
        ['o','o','o','o','o','o','o','o','o','o'],
        ['o','o','o','o','o','o','o','o','o','o'],
        ['o','o','o','o','o','o','o','o','o','x'],
        ['o','o','o','o','o','x','x','o','o','x'],
        ['o','o','o','o','o','x','x','o','x','x'],
    ],

    activeTetromino: {
        x: 3,
        y: 0,
        block: [
            ['o','x','o'],
            ['o','x','o'],
            ['x','x','o'],
        ],
    },

    moveLeft() {
        this.activeTetromino.x -= 1;
    },


    moveRight() {
        this.activeTetromino.x += 1;
    },

    moveDown() {
        this.activeTetromino.y += 1
    },

    rotateTetromino() {
        
    },

    get viewArea() {
        const area = JSON.parse(JSON.stringify(this.area));
        const {x, y, block: tetromino} = this.activeTetromino;

        for (let i = 0; i < tetromino.length; i++) {
            const row = tetromino[i];

            for (let j = 0; j < row.length; j++) {
                if (row[j] === 'x') {
                    area[y + i][x + j] = tetromino[i][j];
                }
            };
        };

        return area;
    },  
};

// rendering
const container = document.querySelector('.container');
const canvas = document.createElement('canvas');
canvas.classList.add('game-area');
container.append(canvas);
canvas.width = SIZE_BLOCK * 10;
canvas.height = SIZE_BLOCK * 20;

const context = canvas.getContext('2d');

const showArea = area => {
    for (let i = 0; i < area.length; i++) {
        const line = area[i];

        for (let j = 0; j < line.length; j++) {
            const block = line[j];

            if (block === 'x') {
                context.fillStyle = 'green';
                context.strokeStyle = 'white';
                context.fillRect(j * SIZE_BLOCK, i * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
                context.strokeRect(j * SIZE_BLOCK, i * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
            }
        };
    };
};

showArea(game.viewArea);