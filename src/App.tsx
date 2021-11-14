import React, { FC,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { terminal_mkdir_request } from "./Redux/actionCreators/terminalActionCreators";
import { TERMINAL_REDUCER_INTERFACE } from "./Redux/actionTypes/terminalActionTypes";
const App: FC = props => {
  const state : TERMINAL_REDUCER_INTERFACE = useSelector((state:any) => state.terminal);
  const [data,setData] = useState<string>("Desktop");
  console.log(state)
  const dispatch = useDispatch();
  const HandleMkdir = () => {
    dispatch(terminal_mkdir_request({currentNode : 1,newName : "Ajay"}));
  }
  const HandleChangeDir = () => {
    const typed = "Ajay";
    const currentNode = 1;
    const target = state.graph[currentNode].filter(node => {
      if(state.edges.get(node) == typed) {
        return node;
      }
    })
    if(target.length) {
      setData(typed);
    }
    else {
      setData("Such Directory Does'nt exist")
    }
  }
  return (
    <div>
      <h1>Hey from App</h1>
      <button onClick={HandleMkdir} className='p-2 bg-red-400 text-white rounded block' >Click Me</button>
      <button onClick={HandleChangeDir} className='p-2 bg-red-400 text-white rounded' >Get Directory</button>
      <h2 className='text-lg my-4 text-green-600 font-bold'>{data}</h2>
    </div>
  );
};

export default App;
