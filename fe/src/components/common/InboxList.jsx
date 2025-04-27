import { Search } from 'lucide-react';
import { useNavigate } from 'react-router';
import { lastTime } from '../../util/lastTime';

export const InboxList = ({ inbox, friendId }) => {
  const navigate = useNavigate();

  const handleUserClick = (selectedFriendId) => {
    navigate(`/chat/${selectedFriendId}`);
  };

  return (
    <div className='w-1/4 flex flex-col bg-white p-4'>
      <div className='pb-6 border-b-1 top-0 bg-white z-10'>
        <h2 className='text-xl flex items-center font-bold'>Inbox</h2>
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
      <div className='space-y-2 flex-1 overflow-y-auto'>
        {inbox.map((message) => (
          <div key={message.friendId} className={`pb-3 border-b-1 `}>
            <div
              className={`flex cursor-pointer p-2 rounded-xl items-center gap-2 ${
                message.friendId === Number(friendId) ? 'bg-[#e4d7ff]' : 'bg-white'
              }`}
              onClick={() => handleUserClick(message.friendId)}
            >
              <img src={message.friendAvatarUrl} alt='avt' className='rounded-full w-9 h-9' />
              <div>
                <p className='font-bold'>{message.friendUsername}</p>
                <div className='flex items-center'>
                  <div className={`text-sm ${message.lastMessageRead ? 'font-light' : 'font-semibold'} text-gray-600`}>
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
