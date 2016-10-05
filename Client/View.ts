namespace Client {
    export class PixiView {
        constructor() {
            $(document).ready(()=> {
                this.setupPixi();
            });
        }

        public stage: PIXI.Container;
        public renderer: any;
        public loader: PIXI.loaders.Loader;

        public bunny: any;

        public bunnyBuffer: any[] = [];

        public setupPixi() {
            this.renderer = PIXI.autoDetectRenderer(800, 600, {autoResize: true}, true);
            $('#gameContainer').append(this.renderer.view);

            this.stage = new PIXI.Container();

            this.loader = PIXI.loader;

            this.loader.add('bunny', "blueParticle.png");
            this.loader.add('tad', "blueParticle.png");
            // this.loader.once('complete', this.onAssetsLoaded);
            this.loader.load(this.onAssetsLoaded.bind(this));
        };

        public onAssetsLoaded() {
            this.bunny = this.createEntityView();
            this.addEntity(this.bunny);
            this.update();
        }

        public update() {
            console.log('update view');
            this.renderer.render(this.stage);
            // requestAnimationFrame(this.update.bind(this));
        };

        public createEntityView() {
            if (PIXI.loader.loading == false) {
                return this.newEntityView();
            } else {
                var self = this;
                setTimeout(function () {
                    self.createEntityView();
                }, 1000);
            }
        }

        public newEntityView() {
            var view = new PIXI.Sprite(PIXI.loader.resources.bunny.texture);
            view.anchor.x = 0.5;
            view.anchor.y = 0.5;
            view.position.x = 200;
            view.position.y = 150;
            return view;
        }

        public addEntity(anEntityView: any) {
            this.stage.addChild(anEntityView);
        };


        public removeEntity(anEntityView: any) {
            this.stage.removeChild(anEntityView);
        };

        public updateBunnyPosition(msg: any) {
            let point = {x: 0, y: 0};
            let temp = msg.split('|');
            point.x = temp[0];
            point.y = temp[1];
            this.bunnyBuffer.push(point);

            console.log(this.bunnyBuffer);
            setTimeout(()=>{
                this.bunny.position = this.bunnyBuffer.pop();
            },100);

        }

    }
}
