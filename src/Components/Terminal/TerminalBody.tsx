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
  type ShowProps = {
    path: string;
  };
  const ShowPath = ({ path }: ShowProps) => {
    console.log(show);
    return (
      <>
        {show && (
          <span
            className={`bg-blue-500 h-7 pl-4 px-1 relative inline-flex items-center`}
          >
            <span className={`text-black inline-block `}>{path}</span>
            <span
              style={{
                clipPath: 'polygon(0 0,100% 50%,100% 50%,0 100%)',
                top: '0.1px',
                transform: 'translateX(15.6px)',
              }}
              className='h-7 w-4 rounded-r-lg bg-blue-500 absolute top-0 right-0  inline-block'
            ></span>
          </span>
        )}
        {!show && (
          <span className={`relative`}>
            <span className={`inline-block`}>{path}</span>
          </span>
        )}
      </>
    );
  };

  return (
    <div
      style={{ paddingBottom: '2px' }}
      className='flex items-center'
      key={key}
    >
      {show && (
        <span className='text-lg text-white px-1 relative bg-black h-7 inline-flex'>
          <span className={`text-white inline-block `}>ashutoshsingh</span>
          <span
            style={{
              clipPath: 'polygon(0 0,100% 50%,100% 50%,0 100%)',
              top: '0.1px',
              transform: 'translateX(15px)',
            }}
            className='h-7 w-4 rounded-r-lg bg-black absolute top-0 right-0 transform inline-block z-20'
          ></span>
        </span>
      )}

      {type === 'help' && <ShowHelp />}

      {type === 'list' && (
        <span className='text-white flex flex-wrap items-center text-lg w-2/4'>
          {path?.split(' ').map((data) => {
            return <span className='mr-6'>{data}</span>;
          })}
        </span>
      )}

      {type === 'pwd' && <span>{path} </span>}
      {(type === 'error' || type === 'info') && (
        <span
          className={`${type == 'error' ? 'text-red-500' : 'text-blue-400'}`}
        >
          <ShowPath path={path} />{' '}
        </span>
      )}
      {index === len && (
        <span
          contentEditable={true}
          onKeyPress={HandlePressedKey}
          ref={inputRef}
          className='inline-block ml-5 text-lg max-w-2/3 outline-none border-none bg-transparent'
        />
      )}
    </div>
  );
};

export default TerminalBody;
