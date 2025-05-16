import { useEffect, useState } from 'react';
import { UserInforService } from '../service/user/userInforService';

export const useSearchUserProfile = (query, userId) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log('userId', userId);
  useEffect(() => {
    const trimmedQuery = query.trim().toLowerCase();

    if (!trimmedQuery) {
      setResults([]);
      return;
    }

    setIsLoading(true);

    const fetchUsers = async () => {
      try {
        const response = await UserInforService.searchUserProfile(trimmedQuery, userId);
        const sorted = [...response].sort((a, b) => {
          return (b.followed === true) - (a.followed === true);
        });

        setResults(sorted);
      } catch (err) {
        console.error('Error fetching users:', err);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [query]);

  return { results, isLoading };
};
