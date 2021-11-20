import ShowHelp from '../ShowHelp';
interface Message {
  type: string;
  message: string;
}
interface Props {
  path: string;
  index: number;
  type: string;
  inputRef: any;
  HandlePressedKey: any;
  messages: Array<Message>;
  key: number;
}
const TerminalBody = ({
  path,
  type,
  index,
  inputRef,
  HandlePressedKey,
  messages,
  key,
}: Props) => {
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
    <div key={key}>
      <span style={{ color: '#7ce335' }} className='text-lg'>
        {!show ? '' : 'ashutoshsingh@web-os: '}
      </span>

      {type === 'help' && <ShowHelp />}

      {type === 'list' && (
        <span className='text-blue-400 flex flex-wrap items-center text-lg w-2/4'>
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

export default TerminalBody;
