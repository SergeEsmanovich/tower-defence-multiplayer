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
        public speed: number = 3;


        public initialize() {
            this.view = new PIXI.Sprite(this.loader.resources[this.name].texture);
            this.view.position.x = 0;
            this.view.position.y = 0;
            this.view.anchor.x = 0.5;
            this.view.anchor.y = 0.5;
            this.stage.addChild(this.view);
        }

        public setStage(stage: PIXI.Container) {
            this.stage = stage;
        }

        public stepToPoint(point: Helper.Point = null) {
            if (this.activeMove && this.targetPosition) {
                let currentPosition = this.getPosition();
                point = this.targetPosition.getVector(currentPosition);
                this.view.rotation = Math.atan2(point.y, point.x) + Math.PI / 2 + Math.PI;
                var length = point.getLengthIsCurrentPointVector();
                if (!length || length < 10) {
                    this.activeMove = false;
                    return;
                }
                currentPosition.x += this.speed * point.x / length;
                currentPosition.y += this.speed * point.y / length;
                this.setPosition(currentPosition);
            }

        }

        setPosition(currentPosition: Helper.Point) {
            this.position = currentPosition;
            this.view.position.x = currentPosition.x;
            this.view.position.y = currentPosition.y;
        }

        getPosition() {
            this.position.x = this.view.position.x;
            this.position.y = this.view.position.y;
            return new Helper.Point(this.position.x, this.position.y);
        }


        setScale(number: number) {
            this.view.scale.x = number;
            this.view.scale.y = number;
        }


    }
}
