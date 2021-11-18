import { Help } from '../helpers/commands';

export default function ShowHelp() {
  return (
    <div>
      {Object.keys(Help).map((key: string) => {
        return (
          <div className='grid grid-cols-3'>
            <div className='col-span-1'>{key}</div>
            <div className='col-span-2 space-x-2'>
              <span>-</span>
              {/* @ts-ignore */}
              <span>{Help[key]}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
