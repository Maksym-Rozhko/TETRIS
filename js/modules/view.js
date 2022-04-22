import { SIZE_BLOCK, COLUMNS, ROWS } from '../main.js';

export class View {
    constructor(container) {
        this.container = container;
    }

    colors = {
        J: 'FireBrick',
        I: 'CadetBlue',
        O: 'Gold',
        L: 'SlateBlue',
        2: 'RoyalBlue',
        T: 'Indigo',
        S: 'MediumSeaGreen',
    };

    canvas = document.createElement('canvas');
    context = this.canvas.getContext('2d');
    
    init() {
        this.canvas.classList.add('game-area');
        this.container.append(this.canvas);
        this.canvas.width = SIZE_BLOCK * COLUMNS;
        this.canvas.height = SIZE_BLOCK * ROWS;
    }

    showArea(area) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        for (let i = 0; i < area.length; i++) {
            const line = area[i];
    
            for (let j = 0; j < line.length; j++) {
                const block = line[j];
    
                if (block !== 'o') {
                    this.context.fillStyle = this.colors[block];
                    this.context.strokeStyle = 'white';
                    this.context.fillRect(j * SIZE_BLOCK, i * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
                    this.context.strokeRect(j * SIZE_BLOCK, i * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
                }
            };
        };
    };
};