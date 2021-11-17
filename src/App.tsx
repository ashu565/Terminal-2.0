import React, { FC,useState,useEffect } from "react";
import Terminal from './Pages/Terminal';
import {useDispatch } from "react-redux";
import { terminal_mkdir_request } from "./Redux/actionCreators/terminalActionCreators";
import { BrowserRouter,Routes,Route } from "react-router-dom";

const App: FC = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    const currentNode = 0;
    const newName = 'Desktop';
    dispatch(terminal_mkdir_request({currentNode,newName}));
    dispatch(terminal_mkdir_request({currentNode,newName : "ashutosh"}));
    dispatch(terminal_mkdir_request({currentNode,newName : "public"}));
  },[])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element= {<Terminal />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
