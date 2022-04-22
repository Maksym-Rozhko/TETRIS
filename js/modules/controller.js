export class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;
    }

    init(codeKey) {
        window.addEventListener('keydown', e => {
            if (e.code === codeKey) {
                const preload = document.querySelector('.preload');
                preload.classList.add('hide-img');
                setTimeout(() => {
                    preload.classList.add('hide');
                }, 2500);
                setTimeout(() => {
                    preload.remove();
                }, 5000);

                this.view.init();
                this.start();
            };
        });
    }

    start() {
        this.view.showArea(this.game.viewArea);

        setInterval(() => {
            this.game.moveDown();
            this.view.showArea(this.game.viewArea);
        }, 1000);

        window.addEventListener('keydown', e => {
            const key = e.code;
        
            switch (key) {
                case 'ArrowLeft':
                    this.game.moveLeft();
                    this.view.showArea(this.game.viewArea);
                    break;
                case 'ArrowRight':
                    this.game.moveRight();
                    this.view.showArea(this.game.viewArea);
                    break;
                case 'ArrowDown':
                    this.game.moveDown();
                    this.view.showArea(this.game.viewArea);
                    break;
                case 'ArrowUp':
                    this.game.rotateTetromino();
                    this.view.showArea(this.game.viewArea);
                    break;
                default:
                    break;
            }
        });
    } 
}