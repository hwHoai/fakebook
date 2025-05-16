import { Card } from '@/components/ui/card';
import { Send } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useWebSocketChat } from '../../hooks/useWebSocketChat';
import { useInfiniteMessages } from '../../hooks/useInfiniteMessages';
import InfiniteScroll from 'react-infinite-scroll-component';

export const ChatWindow = ({ onMessageUpdate, userId, friendId, accessToken, friendName, friendAvatarUrl }) => {
  const [inputValue, setInputValue] = useState('');

  const isLoggedIn = !!accessToken;

  const scrollRef = useRef(null);
  const friendIdRef = useRef(friendId); // Store the latest friendId in a ref

  useEffect(() => {
    friendIdRef.current = friendId;
  }, [friendId]);

  const { messages, fetchMessages, hasMore, addNewMessage } = useInfiniteMessages({
    friendId,
    scrollRef // truyền scrollRef xuống để khôi phục vị trí scroll
  });

  const { sendMessage } = useWebSocketChat({
    userId: userId,
    accessToken,
    isLoggedIn,
    onMessage: (msg) => {
      if (
        (msg.senderId === userId && msg.receiverId === Number(friendIdRef.current)) ||
        (msg.senderId === Number(friendIdRef.current) && msg.receiverId === userId)
      ) {
        addNewMessage(msg);
        if (msg.senderId === Number(friendIdRef.current) && msg.receiverId === userId) {
          onMessageUpdate(Number(friendIdRef.current), msg, false, false);
        }
      } else if (msg.senderId !== friendId && msg.receiverId === userId) {
        onMessageUpdate(msg.senderId, msg, false, true);
      }
    },
    onLogout: null
  });

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const message = {
      senderId: userId,
      receiverId: friendId,
      content: inputValue,
      createdAt: new Date().toISOString()
    };
    sendMessage(userId, friendId, inputValue);
    onMessageUpdate(Number(friendId), message, true, false);
    setInputValue('');
  };

  return (
    <div className='w-2/4 flex items-center justify-center'>
      <Card className='flex flex-col h-[95%] w-full bg-[#f3ecfe]'>
        {/* Header */}
        <div className='border-b-1 border-gray-300 p-2 mx-4'>
          <div className='flex items-center gap-2'>
            <img src={friendAvatarUrl} alt='avt' className='rounded-full w-10 h-10' />
            <div className='flex flex-col justify-center'>
              <span className='text-base font-medium'>{friendName}</span>
              {/* <span className='text-sm text-gray-400'>Online 4 hours ago</span> */}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div id='scrollableDiv' className='flex-1 px-4 overflow-y-auto flex flex-col-reverse' ref={scrollRef}>
          <InfiniteScroll
            dataLength={messages.length}
            next={fetchMessages}
            hasMore={hasMore}
            loader={<p className='text-center text-sm text-gray-500'>Loading...</p>}
            inverse={true}
            scrollableTarget='scrollableDiv'
          >
            {messages.map((msg) => (
              <div key={msg.id} className={`my-2 ${msg.senderId === userId ? 'text-right' : 'text-left'}`}>
                <span className='inline-block bg-[#e4d7ff] px-4 py-2 rounded-xl'>{msg.content}</span>
              </div>
            ))}
          </InfiniteScroll>
        </div>

        {/* Input */}
        <div className='w-full p-4 flex items-center bg-[#e4d7ff] rounded-b-lg'>
          <input
            placeholder='Type your message here'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className='flex-1 bg-[#f3ecfe] p-2 px-4 rounded-full'
          />
          <Send className='ml-2.5 cursor-pointer w-7 h-7' onClick={handleSendMessage} />
        </div>
      </Card>
    </div>
  );
};
