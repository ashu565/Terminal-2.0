import React, { FunctionComponent } from "react";
import { useSelector,useDispatch } from "react-redux";
import { terminal_mkdir_request } from "./Redux/actionCreators/terminalActionCreators";
const App: FunctionComponent = props => {
  const state = useSelector((state) => state);
  console.log(state)
  const dispatch = useDispatch();
  const HandleMkdir = () => {
    dispatch(terminal_mkdir_request({currentNode : 1,newName : "Ajay"}));
  }

  return (
    <div>
      <h1>Hey from App</h1>
      <button onClick={HandleMkdir} className='p-2 bg-red-400 text-white rounded' >Click Me</button>
    </div>
  );
};

export default App;
