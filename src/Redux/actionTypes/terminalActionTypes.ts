export const TERMINAL_MKDIR_REQUEST = "TERMINAL_MKDIR_REQUEST";
export const TERMINAL_MKDIR_RESPONSE = "TERMINAL_MKDIR_RESPONSE";

export const TERMINAL_RM_REQUEST = "TERMINAL_RM_REQUEST"
export const TERMINAL_RM_RESPONSE = "TERMINAL_RM_RESPONSE"


export interface TERMINAL_MKDIR_REQUEST_INTERFACE {
    type : typeof TERMINAL_MKDIR_REQUEST,
    payload : {
        currentNode : number,
        newName : string,
    }
}
export interface TERMINAL_RM_REQUEST_INTERFACE {
    type : typeof TERMINAL_RM_REQUEST,
    payload : {
        currentNode : number,
        delNode : number,
    }
}
export type int = number;

export interface TERMINAL_REDUCER_INTERFACE {
    node : int,
    edges : Map<int,string>,
    graph : Array<Array<int>>,
    leftNodes : Array<int>
}