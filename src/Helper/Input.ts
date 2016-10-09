/// <reference path="Point.ts" />
/// <reference path="Core.ts" />
namespace Helper {
    export class Input {
        constructor() {

        };

        private keyCodes: any = {
            '16': 'shift',
            '32': 'space',
            '37': 'left',
            '38': 'up',
            '39': 'right',
            '40': 'down',
            '9': 'tab'
        };

        public keys: any = {
            'tab': false,
            'shift': false,
            'space': false,
            'up': false,
            'down': false,
            'left': false,
            "right": false,
            'mouse': false
        };

        public keyPressed = 0;
        public lookAtPoint: Helper.Point;
        public lookAtVector: Helper.Point;


        public keyDown(e: any) {
            if (e.keyCode in this.keyCodes) {
                if (!this.keys[this.keyCodes[e.keyCode]]) {
                    this.keyPressed++;
                }
                this.handler(e.keyCode, true);
                e.preventDefault();
            }
        };

        public keyUp(e: any) {
            if (e.keyCode in this.keyCodes) {
                this.handler(e.keyCode, false);
                this.keyPressed--;
                e.preventDefault();
            }
        };

        public mouseMove(e: any) {
            this.lookAtPoint.x = e.layerX;
            this.lookAtPoint.y = e.layerY;
            e.preventDefault();
        }

        /**
         * Attach events to the HTML element
         * We don't care about a time clock here, we attach events, we only want
         * to know if something's happened.
         */
        public attachEvents() {
            var that = this;
            document.addEventListener('keydown', function (e) {
                that.keyDown(e);
            }, false);
            document.addEventListener('keyup', function (e) {
                that.keyUp(e);
            }, false);
            // document.getElementById('gameContainer').addEventListener('mousemove', function (e) {
            //     that.mouseMove(e);
            // }, false);
            // document.getElementById('gameContainer').addEventListener('mousedown', function (e) {
            //     that.keyPressed++;
            //     that.keys.mouse = true;
            // }, false);
            // document.getElementById('gameContainer').addEventListener('mouseup', function (e) {
            //     that.keyPressed--;
            //     that.keys.mouse = false;
            // }, false);
        };

        public isKeyPressed() {
            return this.keyPressed > 0;
        };

        /**
         * Map it to something useful so we know what it is
         */
        public handler(keyCode: any, enabled: boolean) {
            this.keys[this.keyCodes[keyCode]] = enabled;
        };

        /**
         * Constructs a bitmask based on current keyboard state
         * @return A bitfield containing input states
         */
        public constructInputBitmask() {
            var input = 0;

            // Check each key
            if (this.keys['up']) input |= Helper.Core.INPUT_BITMASK.UP;
            if (this.keys['down']) input |= Helper.Core.INPUT_BITMASK.DOWN;
            if (this.keys['left']) input |= Helper.Core.INPUT_BITMASK.LEFT;
            if (this.keys['right']) input |= Helper.Core.INPUT_BITMASK.RIGHT;
            if (this.keys['space']) input |= Helper.Core.INPUT_BITMASK.SPACE;
            if (this.keys['shift']) input |= Helper.Core.INPUT_BITMASK.SHIFT;
            if (this.keys['tab']) input |= Helper.Core.INPUT_BITMASK.TAB;

            return input;
        };

        /**
         * Sets the 'key down' properties based on an input mask
         * @param inputBitmask    A bitfield containing input flags
         */
        public deconstructInputBitmask(inputBitmask: number) {
            this.keys['up'] = (inputBitmask & Helper.Core.INPUT_BITMASK.UP);
            this.keys['down'] = (inputBitmask & Helper.Core.INPUT_BITMASK.DOWN);
            this.keys['left'] = (inputBitmask & Helper.Core.INPUT_BITMASK.LEFT);
            this.keys['right'] = (inputBitmask & Helper.Core.INPUT_BITMASK.RIGHT);
            this.keys['space'] = (inputBitmask & Helper.Core.INPUT_BITMASK.SPACE);
            this.keys['shift'] = (inputBitmask & Helper.Core.INPUT_BITMASK.SHIFT);
            this.keys['mouse'] = (inputBitmask & Helper.Core.INPUT_BITMASK.MOUSE);
        };

        public isLeft() {
            return this.keys['left'];
        };

        public isUp() {
            return this.keys['up'];
        };

        public isRight() {
            return this.keys['right'];
        };

        public isDown() {
            return this.keys['down'];
        };


    }
}