/// <reference path="../typings/index.d.ts" />
/// <reference path="View.ts" />
namespace Client {
    export class Game {
        constructor() {
            this.initialize();
            this.view = new Client.PixiView();
        }

        public socket: any;
        public view: any;

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
            let self = this;
            this.socket.on('message', function (msg: string) {
                self.view.updateBunnyPosition(msg);
                self.view.update();
            });
        }


    }
}

var game = new Client.Game();
