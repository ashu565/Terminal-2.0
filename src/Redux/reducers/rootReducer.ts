import { combineReducers } from "redux";
import terminalReducer from './terminalReducer'

const rootReducer = combineReducers({
  terminal : terminalReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
