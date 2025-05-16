import { useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';

export const useWebSocketChat = ({ userId, accessToken, isLoggedIn, onMessage, onLogout }) => {
  const stompClientRef = useRef(null);

  useEffect(() => {
    if (!isLoggedIn || !accessToken) {
      stompClientRef.current?.deactivate();
      return;
    }

    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`
      },
      reconnectDelay: 5000,

      onConnect: () => {
        console.log('WebSocket connected');

        client.subscribe(`/topic/messages/${userId}`, (message) => {
          console.log('Received message:', message.body);
          const msg = JSON.parse(message.body);
          onMessage(msg);
        });
      },

      onStompError: (frame) => {
        console.error('STOMP error:', frame);
        if (frame?.headers['message']?.includes('Unauthorized') || frame.body?.includes('403')) {
          console.log('Token expiered or invalid');
          onLogout();
        }
      },

      onWebSocketClose: (evt) => {
        console.warn('WebSocket closed:', evt.code);
        if (evt.code === 1008 || evt.code === 4001) {
          onLogout();
        }
      },

      onDisconnect: () => {
        console.log('WebSocket disconnected');
      }
    });

    client.activate();
    stompClientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [userId]);

  const sendMessage = (senderId, receiverId, content) => {
    const client = stompClientRef.current;
    if (client && client.connected) {
      client.publish({
        destination: '/app/chat',
        body: JSON.stringify({
          senderId,
          receiverId,
          content
        })
      });
    } else {
      console.warn('WebSocket is not connected');
    }
  };

  return { sendMessage };
};
