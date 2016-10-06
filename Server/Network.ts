/// <reference path="Config.ts" />
namespace Server {
    import Server = SocketIO.Server;
    export class Network {
        constructor(http: Server) {
            this.http = http;
            this.initialize();
        }

        public socket: any;
        public io: any;
        public http: any;

        public logMessages: string[] = [];

        private initialize() {
            var self = this;
            this.io = require('socket.io').listen(this.http);

            this.io.on('connection', function (socket: any) {
                self.socket = socket;
                self.debug('a user connected');
                self.listener();
            });
        }

        private listener() {
            this.disconnect();
            this.message();
        }

        private disconnect() {
            var self = this;
            this.socket.on('disconnect', function () {
                self.debug('user disconnected');
            });
        }

        private message() {
            var self = this;
            this.socket.on('message', function (msg: string) {
                self.debug(msg);
                self.io.emit('message', self.getRandomPosition());
            });
        }

        private getRandomPosition(): string {
            return this.getRandomInt(100, 800) + '|' + this.getRandomInt(100, 600);
        }


        private getRandomInt(min: number, max: number): number {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }


        private debug(msg: string) {
            if (Server.Config.DEBUG_MOD) {
                console.log(msg);
            }
            this.logMessages.push(msg);
        }


    }
}
