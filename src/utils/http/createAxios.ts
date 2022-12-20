import axios from 'axios';

import { toastError } from '../toast';

const DEBUG = process.env.NODE_ENV === 'development';

// TODO:The initialized action needs to be executed in _app.ts
export const createAxios = () => {
  const instance = axios.create();

  instance.interceptors.request.use(
    (config) => {
      /** In dev, intercepts request and logs it into console for dev */
      if (DEBUG) {
        // console.info('✅', config);
      }
      return config;
    },
    (error) => {
      if (DEBUG) {
        console.error('❌', error);
      }
      // TODO: global handle
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      if (response.status === 401) {
        console.error('❌', 'You are not authorized');
      }
      return response;
    },
    (error) => {
      console.log('error', error);
      if (error.response && error.response.data) {
        // TODO: global handle
        toastError(error.response.data.message);
        console.log('error.response.data', error.response.data);
        return Promise.reject(error.response.data);
      }
      // TODO: global handle
      toastError(error.message);
      console.log('error.message', error.message);
      return Promise.reject(error.message);
    }
  );

  return instance;
};
