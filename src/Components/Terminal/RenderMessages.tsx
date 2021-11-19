import TerminalBody from './TerminalBody';
interface Message {
  type: string;
  message: string;
}

type Props = {
  messages: Array<Message>;
  inputRef: any;
  HandlePressedKey: any;
};

const RenderMessages = ({ messages, inputRef, HandlePressedKey }: Props) => {
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
              inputRef={inputRef}
              HandlePressedKey={HandlePressedKey}
              messages={messages}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};
export default RenderMessages;
