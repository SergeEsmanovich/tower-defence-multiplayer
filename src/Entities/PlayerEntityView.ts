namespace Client {
    export class PlayerEntityView extends GameEntityView {

        public flashLight: PIXI.Sprite;

        public setFlashLight(flashLight: PIXI.Sprite) {
            this.flashLight = flashLight;
        }

        public stepToPoint() {
            super.stepToPoint();
            if (this.activeMove && this.targetPosition) {
                if(this.flashLight) {
                    this.flashLight.position = this.view.position;
                    this.flashLight.rotation = this.view.rotation;
                }
            }
        }

        public initialize() {
            console.log(this.name);
            let textures: PIXI.Texture[] = [];
            for (let i = 0; i < 5; i++) {
                var texture = PIXI.Texture.fromFrame(this.name + (i + 1) + '.png');
                textures.push(texture);
            }
            this.view = new PIXI.extras.MovieClip(textures);
            this.view.position.x = 0;
            this.view.position.y = 0;
            this.view.anchor.x = 0.5;
            this.view.anchor.y = 0.5;
            this.view.animationSpeed = 0.1;
            this.view.scale.set(.7);
            this.view.play();
            this.stage.addChild(this.view);


        }
    }
}
