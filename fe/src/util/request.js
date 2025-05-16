import axios from 'axios';
import { AxiosInterceptor } from '../service/client/axios/axiosInterceptor';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_ENPOINT
});
client.interceptors.request.use(AxiosInterceptor.preRequest, (error) => {
  console.error('Request Error:', error);
  return Promise.reject(error);
});

const request = async (options) => {
  const onSuccess = (response) => {
    console.debug('Request Successful!', response);
    return response.data;
  };

  const onError = (error) => {
    if(error) {
      console.error('Error:', error);
    }

    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.error('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };
  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    onError(error);
    return error;
  }
};

export default request;
