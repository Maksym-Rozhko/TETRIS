// const preload = document.querySelector('.preload');
// console.log(getComputedStyle(preload).opacity);
// setTimeout(() => {
//     preload.classList.add('hide');
// }, 2500);
// setTimeout(() => {
//     preload.remove();
// }, 5000);

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
        rotationIndex: 0, 
        rotation: [
            [
                ['o','x','o'],
                ['o','x','o'],
                ['x','x','o'],
            ],
            [
                ['x','o','o'],
                ['x','x','x'],
                ['o','o','o'],
            ],
            [
                ['o','x','x'],
                ['o','x','o'],
                ['o','x','o'],
            ],
            [
                ['o','o','o'],
                ['x','x','x'],
                ['o','o','x'],
            ]
        ]
    },

    moveLeft() {
        if (this.checkOutPosition(this.activeTetromino.x - 1, this.activeTetromino.y)) {
            this.activeTetromino.x -= 1;
        }
    },


    moveRight() {
        if (this.checkOutPosition(this.activeTetromino.x + 1, this.activeTetromino.y)) {
            this.activeTetromino.x += 1;
        }
    },

    moveDown() {
        if (this.checkOutPosition(this.activeTetromino.x, this.activeTetromino.y + 1)) {
            this.activeTetromino.y += 1
        } else {
            this.stopMove();
        }
    },

    rotateTetromino() {
        this.activeTetromino.rotationIndex = this.activeTetromino.rotationIndex < 3 ? this.activeTetromino.rotationIndex + 1 : 0;

        this.activeTetromino.block = this.activeTetromino.rotation[this.activeTetromino.rotationIndex];

        if (!this.checkOutPosition(this.activeTetromino.x, this.activeTetromino.y)) {
            this.activeTetromino.rotationIndex = this.activeTetromino.rotationIndex < 0 ? this.activeTetromino.rotationIndex - 1 : 3;

            this.activeTetromino.block = this.activeTetromino.rotation[this.activeTetromino.rotationIndex];
        }
    },

    get viewArea() {
        const area = JSON.parse(JSON.stringify(this.area));
        const {x, y, block: tetromino} = this.activeTetromino;

        for (let i = 0; i < tetromino.length; i++) {
            const row = tetromino[i];

            for (let j = 0; j < row.length; j++) {
                if (row[j] !== 'o') {
                    area[y + i][x + j] = tetromino[i][j];
                }
            };
        };

        return area;
    },  

    checkOutPosition(x, y) {
        const tetromino = this.activeTetromino.block;

        for (let i = 0; i < tetromino.length; i++) {
            for (let j = 0; j < tetromino[i].length; j++) {
                if (tetromino[i][j] === 'o') continue;
                if (!this.area[y + i] || !this.area[y + i][x + j] || this.area[y + i][x + j] !== 'o') {
                    return false;
                };
            };
        };

        return true;
    },

    stopMove() {
        const {x, y, block: tetromino} = this.activeTetromino;

        for (let i = 0; i < tetromino.length; i++) {
            const row = tetromino[i];

            for (let j = 0; j < row.length; j++) {
                if (row[j] !== 'o') {
                    this.area[y + i][x + j] = tetromino[i][j];
                }
            };
        };
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
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < area.length; i++) {
        const line = area[i];

        for (let j = 0; j < line.length; j++) {
            const block = line[j];

            if (block !== 'o') {
                context.fillStyle = 'green';
                context.strokeStyle = 'white';
                context.fillRect(j * SIZE_BLOCK, i * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
                context.strokeRect(j * SIZE_BLOCK, i * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
            }
        };
    };
};

window.addEventListener('keydown', e => {
    const key = e.code;

    switch (key) {
        case 'ArrowLeft':
            game.moveLeft();
            showArea(game.viewArea);
            break;
        case 'ArrowRight':
            game.moveRight();
            showArea(game.viewArea);
            break;
        case 'ArrowDown':
            game.moveDown();
            showArea(game.viewArea);
            break;
        case 'ArrowUp':
            game.rotateTetromino();
            showArea(game.viewArea);
            break;
        default:
            break;
    }
});

showArea(game.viewArea);