import {  TERMINAL_MKDIR_RESPONSE, TERMINAL_REDUCER_INTERFACE, TERMINAL_RM_RESPONSE } from "../actionTypes/terminalActionTypes";


const initialState : TERMINAL_REDUCER_INTERFACE = {
    node : 1,
    edges : new Map(),
    graph : [[],[]],
    leftNodes : [],
};


const reducer = (state:TERMINAL_REDUCER_INTERFACE = initialState,action : any)  => {
    const newState = {...state};
    const {type} = action;
    switch(type) {
        case TERMINAL_MKDIR_RESPONSE : {
            const {currentNode,newName} = action.payload;
            // I will tell the node from where currently I am
            // I will tell the new node name which you will add to the edges map
            const target = newState.graph[currentNode].filter(node => {
                if(newState.edges.has(node)) {
                    return node;
                }
            });
            if(target.length == 0) {
                if(newState.leftNodes.length) {
                    const leftNodeSize = newState.leftNodes.length;
                    const newNode = newState.leftNodes[leftNodeSize-1];
                    newState.leftNodes.pop();
                    newState.graph[currentNode].push(newNode);
                    newState.edges.set(newNode,newName);
                }
                else {
                    const newNode = newState.node + 1;
                    newState.graph.push([]);
                    newState.graph[currentNode].push(newNode);
                    newState.node++;
                    newState.edges.set(newNode,newName);
                }
            }
            else {
                console.log('A subdirectory or file Natours already exists.');
            }
            return newState;
        }
        case TERMINAL_RM_RESPONSE : {
            const data : {delNode : number,currentNode : number} = action.payload;
            const {delNode,currentNode} = data;
            if(newState.graph[currentNode].includes(delNode)) {
                const filterEdges = newState.graph[currentNode].filter(node => delNode != node);
                newState.graph[currentNode] = filterEdges;
                newState.leftNodes.push(delNode);
            }
            else {
                console.log("No Node Like this Bro");
            }
            return newState;
        }
        default : {
            return newState;
        }
    }
}


export default reducer;