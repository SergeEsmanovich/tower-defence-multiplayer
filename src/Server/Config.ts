namespace Server {
    export class Config {
        static DEBUG_MOD: boolean = true;
        static ENTITY_TYPES: any = {
            CANDY_ENTITY: 1 << 0,
            PLAYER_ENTITY: 1 << 1,
            OTHER_PLAYER_ENTITY: 1 << 2,
        };

        static RADIUS_GAME_ENTITY = 20;

        static SERVER_SETTING = {
            CLIENT_ID: 0,						// If an object has a client id of zero, that means it is owned by the server
            SOCKET_PROTOCOL: "http",
            SOCKET_DOMAIN: "localhost",
            SOCKET_PORT: 8081,

            /** @return {string} */

        };

        static GET_URL() {
            return this.SERVER_SETTING.SOCKET_PROTOCOL
                + "://" + this.SERVER_SETTING.SOCKET_DOMAIN
                + ":" + this.SERVER_SETTING.SOCKET_PORT;
        }
    }
}
