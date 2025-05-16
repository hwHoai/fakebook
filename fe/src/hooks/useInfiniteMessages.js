import { useEffect, useState, useCallback } from 'react';
import { UserMessageService } from '../service/user/message/userMessage';

export const useInfiniteMessages = ({ friendId, scrollRef }) => {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch messages function
  const fetchMessages = useCallback(
    async (reset = false) => {
      if (isLoading || (!hasMore && !reset)) return;

      const scrollEl = scrollRef?.current;
      const prevScrollHeight = scrollEl?.scrollHeight || 0;
      const prevScrollTop = scrollEl?.scrollTop || 0;

      setIsLoading(true);
      try {
        const res = await UserMessageService.getMessagesWithFriend(friendId, reset ? 0 : page, 20);
        const newMessages = res.content || [];
        console.log('newMessages', newMessages);
        const isLast = res.last;

        setMessages((prev) => (reset ? [...newMessages].reverse() : [...[...newMessages].reverse(), ...prev]));
        setPage((prev) => (reset ? 1 : prev + 1));
        setHasMore(!isLast);

        if (!reset) {
          // Maintain scroll position after prepending messages
          setTimeout(() => {
            if (scrollEl) {
              const newScrollHeight = scrollEl.scrollHeight;
              scrollEl.scrollTop = newScrollHeight - prevScrollHeight + prevScrollTop;
            }
          }, 0);
        } else {
          // Scroll to the bottom for a reset
          setTimeout(() => {
            if (scrollEl) {
              scrollEl.scrollTop = scrollEl.scrollHeight;
            }
          }, 0);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [friendId, page, hasMore, isLoading, scrollRef]
  );

  useEffect(() => {
    setMessages([]);
    setPage(0);
    setHasMore(true);
    fetchMessages(true);
  }, [friendId]);

  const addNewMessage = useCallback((msg) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  return { messages, fetchMessages, hasMore, isLoading, addNewMessage };
};
