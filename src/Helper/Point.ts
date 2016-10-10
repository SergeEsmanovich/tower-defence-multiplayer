namespace Helper {
    export class Point {
        constructor(x: number = 0, y: number = 0) {
            this.x = x;
            this.y = y;
            this.time = new Date().getTime();
        }

        public id: number;
        public x: number;
        public y: number;
        public serverTime: number = null;
        public time: number = null;
        public timePing:number;

        public ping() {
            return this.time - this.serverTime;
        }

        /**
         * TODO rename getVectorFrom
         * @param position
         * @returns {Helper.Point}
         */
        public getVector(position: Helper.Point) {
            let vector = new Helper.Point();
            vector.x = this.x - position.x;
            vector.y = this.y - position.y;
            return vector;
        }

        public getLengthToPoint(point: Helper.Point) {
            let vector = this.getVector(point);
            return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
        }

        public getLengthIsCurrentPointVector() {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        }

        public clone(){
            return JSON.parse(JSON.stringify(this));
        }


    }

}
