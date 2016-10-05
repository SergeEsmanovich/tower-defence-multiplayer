/// <reference path="../typings/index.d.ts" />
/// <reference path="Network.ts" />
namespace Server {
    import Network = Server.Network;
    export class Core {
        constructor() {
            this.initialize();
        }

        public app: any;
        public http: any;
        public network: Network;

        private initialize() {
            this.app = require('express')();
            this.http = require('http').Server(this.app);

            this.network = new Network(this.http);

            this.app.get('/', function (req: any, res: any) {
                res.sendFile('index.html', {root: __dirname});
            });

            this.http.listen(3000, function () {
                console.log('listening on *:3000');
            });
        }
    }
}


var game = new Server.Core();
