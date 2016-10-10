namespace Server {
    export class Config {
        static DEBUG_MOD: boolean = true;
        static ENTITY_TYPES: any = {
            CANDY_ENTITY: 1 << 0,
            PLAYER_ENTITY: 1 << 1,
        }
    }
}
