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
        this.view.createBlockScore();
        this.view.createBlockNextTetramino();

        this.game.createUpdatePanels(this.view.createBlockScore(), this.view.createBlockNextTetramino());

        const timer = () => {
            const time = (1100 - 100 * this.game.level);
            if (this.game.gameOver) return;
            setTimeout(() => {
                this.game.moveDown();
                this.view.showArea(this.game.viewArea);
                timer();
            }, time > 100 ? time : 100);
        };

        timer();

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
                    this.game.rotateTetramino();
                    this.view.showArea(this.game.viewArea);
                    break;
                default:
                    break;
            }
        });
    } 
}