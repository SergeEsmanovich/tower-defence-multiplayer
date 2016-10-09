namespace Conroller {
    export class Client {
        constructor(socket: any, clientId: number) {
            this.socket = socket;
            this.socketId = socket.id;
            this.clientId = clientId;
        }

        public socket: any;
        public socketId: string;
        public clientId: number;
        public msg: string;

        public getSocket() {
            return this.socket;
        }
    }
}