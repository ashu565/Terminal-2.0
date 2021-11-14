import {put,call,takeLatest,all,fork} from 'redux-saga/effects';

import * as actionCreators from '../actionCreators/terminalActionCreators';
import * as actionTypes from '../actionTypes/terminalActionTypes';

function* TerminalMkdir ({payload} : actionTypes.TERMINAL_MKDIR_REQUEST_INTERFACE) {
    console.log(payload)
    actionCreators.terminal_mkdir_response(payload);
    yield put({type : actionTypes.TERMINAL_MKDIR_RESPONSE,payload : payload})
    
}

function* watchTerminalMkdir() {
    yield takeLatest(actionTypes.TERMINAL_MKDIR_REQUEST,TerminalMkdir);
}

export default function* terminalSaga() {
    yield all([fork(watchTerminalMkdir)]);
  }
  