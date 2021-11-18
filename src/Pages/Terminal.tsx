import React, { useRef, useState, useEffect } from 'react';
import ActivityWrapper from '../Components/layouts/ActivityWrapper';
import { useSelector, useDispatch } from 'react-redux';
import { commands } from '../helpers/commands';
import {
  terminal_mkdir_request,
  terminal_rm_request,
} from '../Redux/actionCreators/terminalActionCreators';
import { TERMINAL_REDUCER_INTERFACE } from '../Redux/actionTypes/terminalActionTypes';

import ShowHelp from '../Components/ShowHelp';
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
  const inputRef = useRef<HTMLSpanElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);
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
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
        if (data.trim()) {
          const currentNode = nodeStack[nodeStack.length - 1];
          dispatch(terminal_mkdir_request({ currentNode, newName: data }));
          const lastMessage = messages[messages.length - 1];
          setMessages([...messages, lastMessage]);
        } else {
          const message = 'Specify some folder to create';
          const lastMessage = messages[messages.length - 1];
          setMessages([...messages, { type: 'error', message }, lastMessage]);
        }
        break;
      }
      case 'rmdir': {
        if (data.trim()) {
          const currentNode = nodeStack[nodeStack.length - 1];
          let delNode: number = -1;
          state.graph[currentNode].map((node) => {
            if (state.edges.get(node) == data) {
              delNode = node;
            }
          });
          if (delNode === -1) {
            const message = 'No specified Folder to delete';
            const lastMessage = messages[messages.length - 1];
            setMessages([...messages, { type: 'error', message }, lastMessage]);
            return;
          }
          dispatch(terminal_rm_request({ delNode, currentNode }));
          const lastMessage = messages[messages.length - 1];
          setMessages([...messages, lastMessage]);
        } else {
          const message = 'Specify some folder to delete';
          const lastMessage = messages[messages.length - 1];
          setMessages([...messages, { type: 'error', message }, lastMessage]);
        }
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
        if (dataArr.length) {
          const message = dataArr.join(' ');
          const lastMessage = messages[messages.length - 1];
          setMessages([...messages, { type: 'list', message }, lastMessage]);
        } else {
          const message = 'No Folder and Files Present.';
          const lastMessage = messages[messages.length - 1];
          setMessages([...messages, { type: 'error', message }, lastMessage]);
        }
        break;
      }
      case 'help': {
        const lastMessage = messages[messages.length - 1];
        setMessages([
          ...messages,
          { type: 'help', message: 'help' },
          lastMessage,
        ]);
        break;
      }
      case 'pwd': {
        console.log('ffff');
        const lastMessage = messages[messages.length - 1];
        const arr = nodeStack.map((node, index) => {
          if (index !== 0) {
            return state.edges.get(node);
          }
        });
        let message = arr.join('/');
        console.log(message);
        if (!message) message = '/';
        setMessages([...messages, { type: 'pwd', message }, lastMessage]);
        break;
      }
      default: {
        throw new Error('Command is Unavailble');
        console.log('command is unavailble');
      }
    }
  };

  const HandlePressedKey = (e: any) => {
    if (e.key === 'Enter') {
      const terminalInput = e.target.innerText.trim();
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

  const TerminalBody = ({ path, type, index }: Partial<patt>) => {
    console.log(type);
    const len = messages.length - 1;
    const dont: Array<string> = ['error', 'list', 'help', 'pwd'];
    let show = true;
    {
      /* @ts-ignore */
      if (dont.includes(type)) {
        show = false;
      }
    }
    return (
      <div>
        <span style={{ color: '#7ce335' }} className='text-lg'>
          {!show ? '' : 'ashutoshsingh@web-os: '}
        </span>

        {type === 'help' && <ShowHelp />}

        {type === 'list' && (
          <span className='text-blue-400 flex flex-wrap items-center text-lg w-1/3'>
            {path?.split(' ').map((data) => {
              return <span className='mr-6'>{data}</span>;
            })}
          </span>
        )}

        {type === 'pwd' && <span>{path} </span>}
        {(type === 'error' || type === 'info') && (
          <span
            className={`${
              type == 'error' ? 'text-red-500' : 'text-blue-400'
            } font-semibold`}
          >
            {path}{' '}
          </span>
        )}
        {index === len && (
          <span
            contentEditable={true}
            onKeyPress={HandlePressedKey}
            ref={inputRef}
            className='text-lg max-w-2/3 outline-none border-none bg-transparent'
          />
        )}
      </div>
    );
  };

  const renderMessages = () => {
    return (
      <div className='mt-2 ml-1 overflow-scroll scrollbar-hide'>
        <h4 className='text-blue-400'>Welcome to Web OS</h4>
        <h4 className=''>Type "help" for all the commands</h4>
        <div>
          {messages.map((message: Message, index: number) => {
            return (
              <TerminalBody
                index={index}
                type={message.type}
                path={message.message}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{ backgroundColor: '#300a24' }}
      className='w-2/4 bg-gray-800 shadow-lg rounded-md text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-scroll scrollbar-hide cursor-text'
    >
      <ActivityWrapper title='Terminal' iconSrc='/images/terminal.svg'>
        {renderMessages()}
      </ActivityWrapper>
    </div>
  );
};

export default Terminal;
