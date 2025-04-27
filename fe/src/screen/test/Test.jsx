import { useState } from 'react';
import { Client } from '@stomp/stompjs';

export const Test = () => {
  const [client, setClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const connect = () => {
    const stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      onConnect: (frame) => {
        setConnected(true);
        console.log('Connected: ', frame);
        stompClient.subscribe('/topic/messages', (message) => {
          setMessages((prev) => [...prev, JSON.parse(message.body).content]);
        });
      },
      onWebSocketError: (error) => {
        console.error('WebSocket error:', error);
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame.headers['message'], frame.body);
      }
    });
    stompClient.activate();
    setClient(stompClient);
  };

  const disconnect = () => {
    if (client) {
      client.deactivate();
      setConnected(false);
      setMessages([]);
    }
  };

  const sendMessage = () => {
    client.publish({
      destination: '/app/chat',
      body: JSON.stringify({ senderId: 17, receiverId: 15, content: message })
    });
    setMessage('');
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>WebSocket Chat</h1>
      <div className='mb-4'>
        <button className='btn btn-primary mr-2' onClick={connect} disabled={connected}>
          Connect
        </button>
        <button className='btn btn-secondary' onClick={disconnect} disabled={!connected}>
          Disconnect
        </button>
      </div>
      <div className='mb-4'>
        <input
          type='text'
          className='border p-2 mr-2'
          placeholder='Your name...'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          className='border p-2 mr-2'
          placeholder='Type a message...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className='btn btn-success' onClick={sendMessage} disabled={!connected}>
          Send
        </button>
      </div>
      <table className='table-auto w-full border'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='p-2 border'>Messages</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg, index) => (
            <tr key={index} className='border'>
              <td className='p-2 border'>{msg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
