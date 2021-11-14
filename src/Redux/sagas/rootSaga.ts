import { all, fork } from "redux-saga/effects";
import TerminalSaga from './terminalSaga'
export default function* rootSaga() {
  yield all([fork(TerminalSaga)]);
}
