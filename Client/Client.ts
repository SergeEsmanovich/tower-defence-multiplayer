/// <reference path="../typings/index.d.ts" />
/// <reference path="PixiLoader.ts" />
namespace Client {
    export class Game {
        constructor() {
            this.initialize();
            this.loader = new Client.PixiLoader();
        }

        public loader: Client.PixiLoader;
        public socket: any;

        private initialize() {
            this.socket = io();

            setInterval(()=> {
                this.sendMessage('test');
            }, 5000);

            this.listener();
        }

        private sendMessage(msg: string) {
            this.socket.emit('message', msg);
        }

        private listener() {
            this.socket.on('message', function (msg: string) {
                Client.PixiLoader.game.updateBunnyPosition(msg);
            });
        }


    }
}

var game = new Client.Game();
