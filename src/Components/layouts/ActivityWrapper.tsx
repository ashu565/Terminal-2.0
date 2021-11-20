import { FC } from 'react';
import { MdMinimize as Minimize } from 'react-icons/md';
import { BiSquare as Maximize } from 'react-icons/bi';
import { BsPlus as Cancel } from 'react-icons/bs';
import { FcOpenedFolder as Folder } from 'react-icons/fc';
import axios from 'axios';
import { url } from 'inspector';
interface activity {
  iconSrc: string;
  title: string;
}

const ActivityWrapper: FC<activity> = ({ iconSrc, title, children }) => {
  const Header = () => {
    return (
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
    );
  };

  const HeaderMac = () => {
    return (
      <div
        style={{ background: '#2a2a2a', cursor: '-webkit-grab' }}
        className=' px-2 py-2 w-full'
      >
        <div className='relative w-full flex items-center justify-center'>
          <div className='flex space-x-1.5 absolute top-1/2 left-0 transform -translate-y-1/2'>
            <span className='inline-block h-3.5 w-3.5 rounded-full cursor-pointer bg-red-400'></span>
            <span className='inline-block h-3.5 w-3.5 rounded-full cursor-pointer bg-yellow-300'></span>
            <span className='inline-block h-3.5 w-3.5 rounded-full cursor-pointer bg-green-500'></span>
          </div>
          <div className='flex items-center space-x-1'>
            {/* <Folder size={22} /> */}
            <p className='opacity-90'>ashu@macbook</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <HeaderMac />
      <div
        // style={{ backgroundColor: '#300a24' }}
        className='md:h-xr h-yr rounded-md bg-gray-900 bg-opacity-40 backdrop-filter backdrop-blur-2xl overflow-scroll scrollbar-hide'
      >
        {children}
      </div>
    </div>
  );
};

export default ActivityWrapper;
