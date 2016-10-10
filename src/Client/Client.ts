/// <reference path="../../typings/index.d.ts" />
/// <reference path="PixiLoader.ts" />
/// <reference path="../../src/Helper/Core.ts" />
/// <reference path="../../src/Helper/Input.ts" />
namespace Client {
    export class Game {
        constructor() {
            this.initialize();
            this.loader = new Client.PixiLoader();
        }

        public loader: Client.PixiLoader;
        public socket: any;
        public input: Helper.Input;

        private initialize() {
            this.socket = io();//'http://194.135.88.82:3000'

            this.input = new Helper.Input();
            this.input.attachEvents();
            setInterval(()=> {
                this.sendMessage(this.input.constructInputBitmask().toString() + '|' + new Date().getTime());
            }, Math.round(1000));

            this.listener();
        }

        private sendMessage(msg: string) {
            this.socket.emit('message', msg);
        }

        private listener() {
            this.socket.on('message', function (msg: string) {
                if(Client.PixiLoader.game) {
                    Client.PixiLoader.game.updateWorld(msg);
                }

                // setTimeout(function () {
                // Client.PixiLoader.game.updateBunnyPosition(msg);
                // }, Helper.Core.getRandomInt(10, 15));

                // Client.PixiLoader.game.updateTadPosition(msg);
            });
        }


    }
}

var game = new Client.Game();
