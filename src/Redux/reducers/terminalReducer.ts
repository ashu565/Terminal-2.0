import {  TERMINAL_MKDIR_RESPONSE, TERMINAL_REDUCER_INTERFACE } from "../actionTypes/terminalActionTypes";


const initialState : TERMINAL_REDUCER_INTERFACE = {
    node : 1,
    edges : new Map(),
    graph : [[],[]]
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
                const newNode = newState.node + 1;
                newState.graph.push([]);
                newState.graph[currentNode].push(newNode);
                newState.node++;
                newState.edges.set(newNode,newName);
            }
            else {
                console.log('A subdirectory or file Natours already exists.');
            }
            return newState;
        }
        default : {
            return newState;
        }
    }
}


export default reducer;