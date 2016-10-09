/// <reference path="../../typings/index.d.ts" />
/// <reference path="Network.ts" />
namespace Server {
    export class Core {
        constructor() {
            this.initialize();
        }

        public app: any;
        public http: any;
        public network: Server.Network;
        public express:any;

        private initialize() {
            this.express = require('express');
            this.app = this.express();
            this.http = require('http').Server(this.app);

            this.network = new Network(this.http);

            this.app.get('/', function (req: any, res: any) {
                res.sendFile('index.html', {root: __dirname});
            });

            this.app.use(this.express.static('public'));
            this.app.use(this.express.static('assets'));
            this.app.use(this.express.static('src'));


            this.http.listen(3000, function () {
                console.log('listening on *:3000');
            });
        }
    }
}


var game = new Server.Core();
