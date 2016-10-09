namespace Helper {
    export class Core {
        static getRandomInt(min: number, max: number): number {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        static INPUT_BITMASK: any = {
            UP: 1 << 0,
            DOWN: 1 << 1,
            LEFT: 1 << 2,
            RIGHT: 1 << 3,
            SPACE: 1 << 4,
            SHIFT: 1 << 5,
            TAB: 1 << 6,
            MOUSE: 1 << 7
        }
    }
}