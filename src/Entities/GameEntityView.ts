/// <reference path="GameEntity" />
namespace Client {
    export class GameEntityView extends Entities.GameEntity {
        constructor() {
            super();
            this.loader = PIXI.loader;
        }

        public stage: PIXI.Container;
        public view: any;
        public loader: any;
        public scene: Client.GameScene;


        public initialize() {
            this.view = new PIXI.Sprite(this.loader.resources[this.name].texture);
            this.view.anchor.x = 0.5;
            this.view.anchor.y = 0.5;
            this.view.position.x = 200;
            this.view.position.y = 150;
        }

        public setStage(stage: PIXI.Container) {
            this.stage = stage;
        }

        public stepToPoint(point: Helper.Point = null) {
            if (this.activeMove && this.targetPosition) {
                point = this.targetPosition.getVector(this.view.position);

                var length = point.getLengthIsCurrentPointVector();
                this.view.position.x += this.speed * point.x / length;
                this.view.position.y += this.speed * point.y / length;

                if (length < 10) {
                    this.activeMove = false;
                    console.log('I came');
                }
            }

        }

        setPosition(currentPosition: Helper.Point) {
            this.view.position.x = currentPosition.x;
            this.view.position.y = currentPosition.y;
        }

        getPosition() {
            let currentPosition = new Helper.Point();
            currentPosition.x = this.view.position.x;
            currentPosition.y = this.view.position.y;
            return currentPosition;
        }


        setScale(number: number) {
            this.view.scale.x = number;
            this.view.scale.y = number;
        }


    }
}