import React,{useRef,useState} from 'react';
import ActivityWrapper from '../Components/layouts/ActivityWrapper';
import { useSelector } from 'react-redux';
import {commands} from '../helpers/commands';
interface patt {
    path : string
}
const Terminal : React.FC = () => {
    const [terminalInput,setTerminalInput] = useState<string>("");
    const [terminalError,setTerminalError] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    const HandlePressedKey = (e:any) => {
        if(e.key === "Enter") {
            const arr = terminalInput.split(' ');
            if(arr.length) {
                arr.shift();
                const newInput = arr.join(' ');
                if(!commands.includes(arr[0])) {
                    setTerminalError(newInput);
                } else {
                    if(!newInput) {
                        setTerminalError("Please Specify the Folder");
                    }   
                }
            } else {

            }
        }
    }

    const TerminalBody = ({path} : patt) => {
        return (
            <div>
                <span style={{color : "#7ce335"}} className='text-lg' >ashutoshsingh@web-os: </span>
                <span className='text-blue-400 font-semibold' >/desktop/$ </span>
                <input onChange={e => setTerminalInput(e.target.value.trim())} onKeyPress={HandlePressedKey} ref={inputRef} className='text-lg outline-none border-none bg-transparent' />
            </div>
        )
    }

    return (
        <div onClick={() => inputRef.current?.focus()} style={{height : '35rem',backgroundColor: "#300a24"}} className='w-2/4 bg-gray-800 shadow-lg rounded-md text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-scroll scrollbar-hide cursor-text' > 
            <header>
                <ActivityWrapper title="Terminal" iconSrc="/images/terminal.svg" />
            </header>
            <div className='mt-2 ml-1' >
                <h4 className='text-blue-400' >Welcome to Web OS</h4>
                <h4 className='' >Type "help" for all the commands</h4>
                <TerminalBody path = "ffdd" />
            </div>
        </div>
    )
}

export default Terminal;

// const state : TERMINAL_REDUCER_INTERFACE = useSelector((state:any) => state.terminal);
//   const [data,setData] = useState<string>("Desktop");
//   console.log(state)
//   const dispatch = useDispatch();
//   const HandleMkdir = () => {
//     dispatch(terminal_mkdir_request({currentNode : 1,newName : "Ajay"}));
//   }
//   const HandleChangeDir = () => {
//     const typed = "Ajay";
//     const currentNode = 1;
//     const target = state.graph[currentNode].filter(node => {
//       if(state.edges.get(node) == typed) {
//         return node;
//       }
//     })
//     if(target.length) {
//       setData(typed);
//     }
//     else {
//       setData("Such Directory Does'nt exist")
//     }
//   }

//   const HandleRMdir = () => {
//     dispatch(terminal_rm_request({currentNode : 1,delNode : 2}));
//   }
