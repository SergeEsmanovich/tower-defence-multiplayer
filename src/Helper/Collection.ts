namespace Helper {
    export interface IKey {
        key: string;
        inputCode:number;
        clientTime:number;
        deltaTime:number;
        calcVector(i:number):any;
        setTargetPosition(point:Helper.Point):any;
        activeMove:boolean;
    }

    interface ICollection<T extends IKey> {
        add(value: T):any;
        get(key: string): T;
        remove(key: string):any;
    }

    export class Collection<T extends IKey> implements ICollection<T> {

        private array: T[] = [];
        private keyToIndex: {[key: string]: number} = {};

        add(value: T) {
            this.array.push(value);
            this.keyToIndex[value.key] = this.array.length - 1;
        }

        forEach(callback:any){
            this.array.map(callback);
        }

        get(key: string): T {
            return this.array[this.keyToIndex[key]];
        }

        remove(key: string) {
            this.array.splice(this.keyToIndex[key], 1);
            delete this.keyToIndex[key];
        }
    }
}