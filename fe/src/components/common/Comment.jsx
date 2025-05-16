import { useState } from 'react';

export const Comment = ({ user, text, time, avatar }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='flex items-start gap-3'>
      {/* User Avatar */}
      <img src={avatar} alt={user} className='w-8 h-8 rounded-full' />

      {/* Comment Content */}
      <div className='bg-white p-2 rounded-lg shadow text-sm max-w-[400px] w-fit break-words'>
        <p className='font-semibold'>{user}</p>

        {/* Comment Text */}
        <p className={`overflow-hidden ${expanded ? '' : 'line-clamp-2'}`}>{text}</p>

        {/* Nút "Xem thêm" / "Thu nhỏ" */}
        {text.length > 100 && (
          <div>
            <button
              onClick={() => setExpanded(!expanded)}
              className='text-[#7940ed] cursor-pointer text-xs font-semibold'
            >
              {expanded ? 'Thu nhỏ' : 'Xem thêm'}
            </button>
          </div>
        )}

        {/* Timestamp */}
        <span className='text-xs text-gray-500'>{time}</span>
      </div>
    </div>
  );
};
