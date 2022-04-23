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

    createBlockScore() {
        const scoreBlock = document.createElement('div');
        scoreBlock.classList.add('score');

        const linesElem = document.createElement('p');
        const scoreElem = document.createElement('p');
        const levelElem = document.createElement('p');
        const recordElem = document.createElement('p');

        scoreBlock.append(linesElem, scoreElem, levelElem, recordElem);

        this.container.append(scoreBlock);

        return (lines, score, level, record) => {
            linesElem.textContent = `lines: ${lines}`;
            scoreElem.textContent = `score: ${score}`;
            levelElem.textContent = `level: ${level}`;
            recordElem.textContent = `record: ${record}`;
        }
    }

    createBlockNextTetramino() {
        const tetraminoBlock = document.createElement('div');
        tetraminoBlock.classList.add('next');

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        tetraminoBlock.append(canvas);

        this.container.append(tetraminoBlock);

        return (tetramino) => {
            canvas.width = SIZE_BLOCK * tetramino.length;
            canvas.height = SIZE_BLOCK * tetramino.length;
            context.clearRect(0, 0, canvas.width, canvas.height);
    
            for (let i = 0; i < tetramino.length; i++) {
                const line = tetramino[i];
        
                for (let j = 0; j < line.length; j++) {
                    const block = line[j];
        
                    if (block !== 'o') {
                        context.fillStyle = this.colors[block];
                        context.strokeStyle = 'white';
                        context.fillRect(j * SIZE_BLOCK, i * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
                        context.strokeRect(j * SIZE_BLOCK, i * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
                    }
                };
            };
        }
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