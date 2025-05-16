import { useEffect, useState } from 'react';
import { UserInforService } from '../service/user/userInforService';

export const useSearchUsers = (query, delay = 300) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const trimmedQuery = query.trim().toLowerCase();

    if (!trimmedQuery) {
      setResults([]);
      return;
    }

    setIsLoading(true);

    const handler = setTimeout(() => {
      const fetchUsers = async () => {
        try {
          const response = await UserInforService.searchUser(trimmedQuery);

          console.log('Fetched users:', response);
          setResults(response);
        } catch (err) {
          console.error('Error fetching users:', err);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchUsers();
    }, delay);

    return () => clearTimeout(handler);
  }, [query, delay]);

  return { results, isLoading };
};
