import { FC } from 'react';
import { MdMinimize as Minimize } from 'react-icons/md';
import { BiSquare as Maximize } from 'react-icons/bi';
import { BsPlus as Cancel } from 'react-icons/bs';
import axios from 'axios';
interface activity {
  iconSrc: string;
  title: string;
}

const ActivityWrapper: FC<activity> = ({ iconSrc, title, children }) => {
  return (
    <div>
      <div
        style={{ background: '#2a2a2a', cursor: '-webkit-grab' }}
        className='flex justify-between px-2 py-2 w-full'
      >
        <div className='flex items-center space-x-2'>
          <img src={iconSrc} alt={title} className='inline-block'></img>
          <h4 className='text-lg'>{title}</h4>
        </div>
        <div className='flex items-center space-x-2'>
          <span className='p-1 hover:bg-gray-500 rounded-full'>
            <Minimize className='transform -translate-y-1' />
          </span>
          <span className='p-1 hover:bg-gray-500 rounded-full'>
            <Maximize size={14} className='text-white' />
          </span>
          <span className='bg-red-600 rounded-full hover:bg-gray-500 cursor-pointer'>
            <Cancel size={22} className='transform rotate-45' />
          </span>
        </div>
      </div>
      <div
        style={{ backgroundColor: '#300a24' }}
        className='md:h-xr h-yr overflow-scroll scrollbar-hide '
      >
        {children}
      </div>
    </div>
  );
};

export default ActivityWrapper;
