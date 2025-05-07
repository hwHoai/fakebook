import { useState, useEffect } from 'react';
import { UserInforService } from '../service/user/userInforService';

export const useRecommendUsers = (userId) => {
  const [recommendUsers, setRecommendUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRecommendUsers = async () => {
      setIsLoading(true);
      try {
        const response = await UserInforService.getRecommendUsers(userId);
        setRecommendUsers(response);
      } catch (error) {
        console.error('Error fetching recommended users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendUsers();
  }, [userId]);

  return { recommendUsers, isLoading };
};
