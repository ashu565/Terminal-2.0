import React, { FC, useState, useEffect } from 'react';
import Terminal from './Pages/Terminal';
import { useDispatch } from 'react-redux';
import { terminal_mkdir_request } from './Redux/actionCreators/terminalActionCreators';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

const App: FC = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const currentNode = 0;
    const newName = 'desktop';
    dispatch(terminal_mkdir_request({ currentNode, newName }));
    dispatch(terminal_mkdir_request({ currentNode, newName: 'ashutosh' }));
    dispatch(terminal_mkdir_request({ currentNode, newName: 'public' }));
    const init = async () => {
      await axios.get(
        'http://localhost:4000/api/v2/quiz/send-quiz-score/3252345'
      );
    };
    init();
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundImage: 'url(/images/6.jpeg)',
        backgroundSize: 'cover',
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Terminal />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
