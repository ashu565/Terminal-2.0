import { TERMINAL_MKDIR_REQUEST, TERMINAL_MKDIR_REQUEST_INTERFACE, TERMINAL_MKDIR_RESPONSE } from "../actionTypes/terminalActionTypes"

export const terminal_mkdir_request = (data : {currentNode : number,newName : string}) => {
    console.log(data)
    return ({
        type : TERMINAL_MKDIR_REQUEST,
        payload : data,
    })
}

export const terminal_mkdir_response = (payload : {currentNode : number,newName : string}) => {
    console.log(payload)
        return ({
            type : TERMINAL_MKDIR_RESPONSE,
            payload,
        })
}