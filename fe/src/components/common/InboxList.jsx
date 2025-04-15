import { Search } from 'lucide-react';
import { useInbox } from '../../hooks/useInbox';
import { lastTime } from '../../util/lastTime';
export const InboxList = () => {
  const { inbox } = useInbox(1);

  return (
    <div className='w-1/4 flex flex-col  bg-white p-4 '>
      <div className=' pb-6 border-b-1 top-0 bg-white z-10'>
        <h2 className='text-xl flex items-center font-bold'>
          Inbox
          {/* <div className='text-red-500 text-base bg-[#FFB5BE] px-1.5 ml-1.5 rounded-xl'>4 new</div> */}
        </h2>
        {/* <div className='flex gap-2 my-2'>
        <button className='bg-purple-200 px-3 py-1 rounded'>General</button>
        <button className='px-3 py-1 rounded'>Groups</button>
        <button className='px-3 py-1 rounded'>Personal</button>
      </div> */}
        <div className='mt-8 relative'>
          <button className='absolute cursor-pointer left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'>
            <Search className='w-5 h-5' />
          </button>
          <input
            type='text'
            placeholder='Search here'
            className='w-full p-1 pl-10 pr-12 bg-[#f3ecfe] rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7940ed] placeholder:text-sm placeholder:text-gray-400'
          />
        </div>
      </div>

      {/* List of conversations */}
      <div className='space-y-2 flex-1  overflow-y-auto'>
        {/* <div className='pb-3 bg-white  border-b-1  '>
          <div className='flex p-2 rounded-xl bg-[#7940ed] items-center gap-2'>
            <img src='src/assets/img/test.jpg' alt='avt' className='rounded-full w-9 h-9' />
            <div>
              <p className='font-bold'>Vinhcuto Vai</p>
              <p className='text-sm text-gray-600'>You: E may gay a</p>
            </div>
          </div>
        </div> */}

        {inbox.map((message) => (
          <div key={message.friendId} className='pb-3 bg-white border-b-1 '>
            <div className='flex p-2 rounded-xl  items-center gap-2'>
              <img src='src/assets/img/test.jpg' alt='avt' className='rounded-full w-9 h-9' />
              <div>
                <p className='font-bold'>{message.friendUsername}</p>
                <div className='flex items-center'>
                  <div className={`text-sm ${message.lastMessageRead ? 'font-light' : 'font-semibold'}  text-gray-600`}>
                    {message.sentByMe && 'You: '}
                    {message.lastMessage.length > 20 ? `${message.lastMessage.slice(0, 20)}...` : message.lastMessage}
                  </div>
                  <div className='text-xs ml-2 text-gray-400'>{lastTime(message.lastMessageTime)}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
