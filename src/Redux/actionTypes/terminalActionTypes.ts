export const TERMINAL_MKDIR_REQUEST = "TERMINAL_MKDIR_REQUEST";
export const TERMINAL_MKDIR_RESPONSE = "TERMINAL_MKDIR_RESPONSE";


export interface TERMINAL_MKDIR_REQUEST_INTERFACE {
    type : typeof TERMINAL_MKDIR_REQUEST,
    payload : {
        currentNode : number,
        newName : string,
    }
}
export type int = number;

export interface TERMINAL_REDUCER_INTERFACE {
    node : int,
    edges : Map<int,string>,
    graph : Array<Array<int>>
}