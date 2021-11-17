import React, { useRef, useState, useEffect } from 'react';
import ActivityWrapper from '../Components/layouts/ActivityWrapper';
import { useSelector, useDispatch } from 'react-redux';
import { commands } from '../helpers/commands';
import { terminal_mkdir_request } from '../Redux/actionCreators/terminalActionCreators';
import { TERMINAL_REDUCER_INTERFACE } from '../Redux/actionTypes/terminalActionTypes';
interface patt {
  path: string;
  index: number;
  type: string;
}
interface pattx {
  printData: Array<string>;
}
interface Message {
  type: string;
  message: string;
}
const Terminal: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [nodeStack, setNodeStack] = useState<Array<number>>([0]);

  const [messages, setMessages] = useState<Array<Message>>([
    { type: 'info', message: '/$' },
  ]);
  const [update, setUpdate] = useState(false);
  const state: TERMINAL_REDUCER_INTERFACE = useSelector(
    (state: any) => state.terminal
  );
  console.log(state);
  console.log(nodeStack);
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current?.focus();
  }, [messages]);

  const updateData = (data: string, nodeStack: Array<number>) => {
    const arr = nodeStack.map((node, index) => {
      if (index !== 0) {
        return state.edges.get(node);
      }
    });
    let message = arr.join('/');
    if (data) {
      message += '/' + data + '/$';
    } else {
      message += '/$';
    }
    setMessages([...messages, { type: 'info', message }]);
  };

  const HandleCommands = (command: string, data: string) => {
    command.toLocaleLowerCase();
    switch (command) {
      case 'mkdir': {
        const currentNode = nodeStack[nodeStack.length - 1];
        dispatch(terminal_mkdir_request({ currentNode, newName: data }));
        const lastMessage = messages[messages.length - 1];
        setMessages([...messages, lastMessage]);
        break;
      }
      case 'cd': {
        if (data === '..') {
          if (nodeStack.length == 1) {
            const message = 'Cannot go under root directory';
            const lastMessage = messages[messages.length - 1];
            setMessages([...messages, { type: 'error', message }, lastMessage]);
            return;
          }
          const cloneStack: number[] = [...nodeStack];
          cloneStack.pop();
          if (cloneStack.length == 0) {
            throw new Error('error thrown from cloneStack');
          }
          updateData('', cloneStack);
          setNodeStack(cloneStack);
        } else {
          const currentNode = nodeStack[nodeStack.length - 1];
          let newNode: number = -1;
          state.graph[currentNode].map((node) => {
            if (state.edges.get(node) == data) {
              newNode = node;
            }
          });
          if (newNode == -1) {
            const message = 'The system cannot find the path specified.';
            const lastMessage = messages[messages.length - 1];
            setMessages([...messages, { type: 'error', message }, lastMessage]);
          } else {
            updateData(data, nodeStack);
            setNodeStack([...nodeStack, newNode]);
          }
        }
        break;
      }
      case 'ls': {
        const currentNode = nodeStack[nodeStack.length - 1];
        const dataArr = state.graph[currentNode].map((node) => {
          return state.edges.get(node);
        });
        console.log(dataArr);
        break;
      }
      default: {
        console.log('command is unavailble');
      }
    }
  };

  const HandlePressedKey = (e: any) => {
    if (e.key === 'Enter') {
      const terminalInput = e.target.value.trim();
      const arr = terminalInput.split(' ');
      if (!commands.includes(arr[0])) {
        const message = `"${arr[0]}" is not any command.`;
        const lastMessage = messages[messages.length - 1];
        if (arr[0]) {
          setMessages([...messages, { type: 'error', message }, lastMessage]);
        } else {
          setMessages([...messages, lastMessage]);
        }
        return;
      }
      const command = arr[0];
      arr.shift();
      const newBody = arr.join(' ');
      HandleCommands(command, newBody);
    }
  };

  const TerminalBody = ({ path, type }: Partial<patt>) => {
    console.log(type);
    return (
      <div>
        <span style={{ color: '#7ce335' }} className='text-lg'>
          {type !== 'error' ? 'ashutoshsingh@web-os: ' : ''}
        </span>
        <span
          className={`${
            type == 'error' ? 'text-red-500' : 'text-blue-400'
          } font-semibold`}
        >
          {path}{' '}
        </span>
        {type != 'error' && (
          <input
            type='text'
            onKeyPress={HandlePressedKey}
            ref={inputRef}
            className='text-lg outline-none border-none bg-transparent'
          />
        )}
      </div>
    );
  };
  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{ height: '35rem', backgroundColor: '#300a24' }}
      className='w-2/4 bg-gray-800 shadow-lg rounded-md text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-scroll scrollbar-hide cursor-text'
    >
      <header>
        <ActivityWrapper title='Terminal' iconSrc='/images/terminal.svg' />
      </header>
      <div className='mt-2 ml-1'>
        <h4 className='text-blue-400'>Welcome to Web OS</h4>
        <h4 className=''>Type "help" for all the commands</h4>
        {messages.map((message: Message, index: number) => {
          return <TerminalBody type={message.type} path={message.message} />;
        })}
      </div>
    </div>
  );
};

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
