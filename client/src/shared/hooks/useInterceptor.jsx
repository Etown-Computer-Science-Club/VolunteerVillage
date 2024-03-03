/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const urlsToUseAuth0 = [
  'https://community-production-c11b.up.railway.app',
  'http://localhost:3001',
];

const useInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const setInterceptors = () => {
      axios.interceptors.request.clear();
      axios.interceptors.request.use(async (config) => {
        if (!urlsToUseAuth0.some((url) => config.url && config.url.startsWith(url))) return config;
        
        const token = await getTokenFromAuth0();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });

      axios.interceptors.response.clear();
      axios.interceptors.response.use(null, async (error) => {
        if (error.response?.status === 401) {
          navigate('/unauthorized');
          return Promise.reject(error);
        }

        const expectedError = error.response
                && error.response.status >= 400
                && error.response.status < 500;

        if (!expectedError) {
          toast.error('An unexpected error occurrred.');
        }

        return Promise.reject(error);
      });
    };

    setInterceptors();

    return () => {
      axios.interceptors.request.eject();
      axios.interceptors.response.eject();
    };
  }, [navigate]);

  const getTokenFromAuth0 = async () => {
    try {
      // Call Auth0 SDK method to obtain access token
      const accessToken = await auth0Client.getTokenSilently();
      return accessToken;
    } catch (error) {
      console.error('Failed to get token from Auth0', error);
      return null;
    }
  };
  
  return null;
};

export default useInterceptor;
