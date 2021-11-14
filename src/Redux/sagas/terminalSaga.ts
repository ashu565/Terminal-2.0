import {put,call,takeLatest,all,fork} from 'redux-saga/effects';

import * as actionCreators from '../actionCreators/terminalActionCreators';
import * as actionTypes from '../actionTypes/terminalActionTypes';

function* TerminalMkdir ({payload} : actionTypes.TERMINAL_MKDIR_REQUEST_INTERFACE) {
    console.log(payload)
    yield put(actionCreators.terminal_mkdir_response(payload));
}

function* TerminalRM ({payload} : actionTypes.TERMINAL_RM_REQUEST_INTERFACE) {
    yield put(actionCreators.terminal_rm_response(payload))
}

function* watchTerminalMkdir() {
    yield takeLatest(actionTypes.TERMINAL_MKDIR_REQUEST,TerminalMkdir);
}

function* watchTerminalRM() {
    yield takeLatest(actionTypes.TERMINAL_RM_REQUEST,TerminalRM)
}

export default function* terminalSaga() {
    yield all([fork(watchTerminalMkdir)]);
  }
  