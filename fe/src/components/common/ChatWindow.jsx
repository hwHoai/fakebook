import { Card } from '@/components/ui/card';
import { Send } from 'lucide-react';
import { useState } from 'react';

export const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Wanna go to the dinner tonight?', sender: 'you' },
    { id: 2, text: 'No, I didn’t sleep last night dude. I just wanna stay at home', sender: 'me' },
    { id: 3, text: 'E may gay a', sender: 'you' },
    { id: 4, text: 'E may gay a', sender: 'you' },
    { id: 5, text: 'E may gay a', sender: 'you' },
    { id: 6, text: 'E may gay a', sender: 'you' },
    { id: 7, text: 'E may gay a', sender: 'you' },
    { id: 8, text: 'E may gay a', sender: 'you' },
    { id: 9, text: 'E may gay a', sender: 'you' },
    { id: 10, text: 'E may gay a', sender: 'you' },
    { id: 11, text: 'E may gay a', sender: 'you' },
    { id: 12, text: 'E may gay a', sender: 'you' }
  ]);
  return (
    <div className='w-2/4 flex items-center justify-center'>
      <Card className=' flex flex-col h-[95%] w-full  bg-[#f3ecfe]'>
        {/* Chat Window Header */}
        <div className='border-b-1 border-gray-300 p-2 mx-4 '>
          <div className='flex items-center gap-2'>
            <img src='src/assets/img/test.jpg' alt='avt' className='rounded-full w-10 h-10' />
            <div className='flex flex-col justify-center '>
              <span className='text-base font-medium '>Nam cuto</span>
              <span className='text-sm text-gray-400'>Online 4 hours ago</span>
            </div>
          </div>
        </div>
        {/* Chat Messages */}
        <div className='flex-1 px-4 overflow-y-auto'>
          {messages.map((msg) => (
            <div key={msg.id} className={`my-2 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
              <span className='inline-block bg-[#e4d7ff] px-4 py-2 rounded-xl'>{msg.text}</span>
            </div>
          ))}
        </div>

        {/* Chat Box */}
        <div className='w-full p-4 flex items-center bg-[#e4d7ff] rounded-b-lg'>
          <input placeholder='Type your message here' className='flex-1 bg-[#f3ecfe] p-2 px-4 rounded-full' />
          <Send className='ml-2.5 cursor-pointer w-7 h-7' />
        </div>
      </Card>
    </div>
  );
};
