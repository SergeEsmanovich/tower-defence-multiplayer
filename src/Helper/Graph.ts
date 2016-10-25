/// <reference path="../../src/Helper/Edge.ts" />
namespace Helper {
    export class Graph {
        public edges: Helper.Edge[] = [];

        addEdge(edge: Helper.Edge) {
            this.edges.push(edge);
        }
    }
}