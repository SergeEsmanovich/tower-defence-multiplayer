/// <reference path="Config.ts" />
/// <reference path="../Helper/Input.ts" />
/// <reference path="../Entities/PlayerEntity.ts" />
/// <reference path="../Controller/Client.ts" />
/// <reference path="../Controller/FieldController.ts" />
/// <reference path="GameBody.ts" />
namespace Server {
    import Server = SocketIO.Server;
    export class Network {

        constructor(http: Server) {
            this.http = http;
            this.initialize();
            this.fieldController = new Controller.FieldController();
            this.gameBody = new Server.GameBody(this.fieldController);
        }

        public gameBody: Server.GameBody;
        private clientId: number = 1;
        public socket: any;
        public io: any;
        public http: any;
        public alpha: number = 0;
        public fieldController: Controller.FieldController;


        public id: number = 0;

        public logMessages: string[] = [];

        public test: any = [];

        private initialize() {
            this.io = require('socket.io').listen(this.http);

            this.io.on('connection', (socket: any)=> {
                this.socket = socket;
                this.debug('a user ' + this.socket.id + ' connected');
                this.listener();
            });
        }

        private listener() {
            this.onSocketConnection();
        }

        public onSocketConnection() {
            let client = new Controller.Client(this.socket, this.getClientId());
            this.fieldController.addPlayer(client);
            this.onSocketMessages(client);
        }

        private onSocketMessages(client: Controller.Client) {

            client.getSocket().on('message', (msg: string) => {
                client.msg = msg;

                let mess = this.fieldController.createMessageForSend();

                // this.io.sockets.connected[client.socketId].emit('message', 'private message for ' + client.socketId);
                this.io.sockets.connected[client.socketId].emit('message', mess);
                // this.io.emit('message', 'public message');
            });

            client.getSocket().on('disconnect', () => {
                this.debug('user ' + client.socketId + ' disconnected');
            });

        }

        // private getPosition(temp: any) {
        //     let input = new Helper.Input();
        //     input.deconstructInputBitmask(Number(temp[0]));
        //     if (input.isLeft()) {
        //         this.player.position.x -= this.player.speed;
        //     }
        //     if (input.isRight()) {
        //         this.player.position.x += this.player.speed;
        //     }
        //     if (input.isUp()) {
        //         this.player.position.y -= this.player.speed;
        //     }
        //     if (input.isDown()) {
        //         this.player.position.y += this.player.speed;
        //     }
        //
        //     this.id++;
        //     return this.player.position.x + '|' + this.player.position.y + '|' + temp[1] + '|' + this.id;
        // }


        private debug(msg: string) {
            if (Server.Config.DEBUG_MOD) {
                console.log(msg);
            }
            this.logMessages.push(msg);
        }


        private getClientId() {
            return this.clientId++;
        }
    }
}
