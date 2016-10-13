namespace Controller {
    export class GameInfoView {

        constructor(){

        }

        public stage: PIXI.Container;

        public pingText: PIXI.Text;

        public setStage(stage: PIXI.Container) {
            this.stage = stage;
        }

        public setPing(text:string) {
            this.pingText.text = 'Ping: ' + text;
        }

        public displayPing() {
            let style = {
                fontFamily: 'Arial',
                fontSize: '36px',
                fontStyle: 'italic',
                fontWeight: 'bold',
                fill: '#F7EDCA',
                stroke: '#4a1850',
                strokeThickness: 5,
                dropShadow: true,
                dropShadowColor: '#000000',
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 6,
                wordWrap: true,
                wordWrapWidth: 440
            };
            this.pingText = new PIXI.Text('Ping:', style);
            this.pingText.x = 30;
            this.pingText.y = 30;

            this.stage.addChild(this.pingText);
        }
    }
}
