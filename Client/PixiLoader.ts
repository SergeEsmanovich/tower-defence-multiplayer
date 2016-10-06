/// <reference path="GameScene.ts" />
namespace Client {
    export class PixiLoader {
        constructor() {
            $(document).ready(()=> {
                this.setupPixi();
            });
        }

        public static game: Client.GameScene;
        public loader: PIXI.loaders.Loader;

        public setupPixi() {
            this.loader = PIXI.loader;
            this.loader.add('bunny', "blueParticle.png");
            this.loader.add('tad', "greenParticle.png");
            this.loader.once('complete', Client.PixiLoader.onAssetsLoaded);
            this.loader.load();
        };

        public static onAssetsLoaded() {
            Client.PixiLoader.game = new Client.GameScene();
        }

    }
}
