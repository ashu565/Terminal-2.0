import React, { FC,useState } from "react";
import Terminal from './Pages/Terminal';
import { useSelector,useDispatch } from "react-redux";
import { terminal_mkdir_request, terminal_rm_request } from "./Redux/actionCreators/terminalActionCreators";
import { TERMINAL_REDUCER_INTERFACE } from "./Redux/actionTypes/terminalActionTypes";

import { BrowserRouter,Routes,Route } from "react-router-dom";

const App: FC = props => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element= {<Terminal />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
