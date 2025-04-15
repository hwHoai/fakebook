import { useEffect, useState } from 'react';
import { UserMessageService } from '../service/user/message/userMessage';
export const useInbox = (userId) => {
  const [inbox, setInbox] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    UserMessageService.getUserInboxList(userId)
      .then((res) => setInbox(res))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [userId]);

  return { inbox, loading, error };
};
