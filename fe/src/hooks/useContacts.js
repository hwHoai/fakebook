import { useState, useEffect } from 'react';
import { UserInforService } from '../service/user/userInforService';

export const useContacts = (userId) => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      setIsLoading(true);
      try {
        const response = await UserInforService.getContacts(userId);
        setContacts(response);
      } catch (error) {
        console.error('Error fetching recommended users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, [userId]);

  return { contacts, isLoading };
};
