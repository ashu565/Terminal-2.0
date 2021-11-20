import React, { useRef, useState, useEffect } from 'react';
import ActivityWrapper from '../Components/layouts/ActivityWrapper';
import { useSelector, useDispatch } from 'react-redux';
import { commands } from '../helpers/commands';
import {
  terminal_mkdir_request,
  terminal_rm_request,
} from '../Redux/actionCreators/terminalActionCreators';
import { TERMINAL_REDUCER_INTERFACE } from '../Redux/actionTypes/terminalActionTypes';

import RenderMessages from '../Components/Terminal/RenderMessages';

interface Message {
  type: string;
  message: string;
}
const Terminal: React.FC = () => {
  const inputRef = useRef<HTMLSpanElement | null>(null);
  const [nodeStack, setNodeStack] = useState<Array<number>>([0]);

  const [messages, setMessages] = useState<Array<Message>>([
    { type: 'info', message: '/$' },
  ]);
  const state: TERMINAL_REDUCER_INTERFACE = useSelector(
    (state: any) => state.terminal
  );
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
    console.log(e.key);
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

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      // style={{ backgroundColor: '#300a24' }}
      className='w-full md:w-2/5  shadow-lg rounded-md text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-scroll scrollbar-hide cursor-text'
    >
      <ActivityWrapper title='Terminal' iconSrc='/images/terminal.svg'>
        <RenderMessages
          HandlePressedKey={HandlePressedKey}
          inputRef={inputRef}
          messages={messages}
        />
      </ActivityWrapper>
    </div>
  );
};

export default Terminal;
