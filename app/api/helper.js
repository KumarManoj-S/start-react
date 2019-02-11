import axios from 'axios';

const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

axios.interceptors.response.use((res) => {
  const { data } = res;
  if (data && isJson(data)) { return JSON.parse(data); }
  return data;
}, (error) => {
  return Promise.reject(error.response ? JSON.parse(error.response.data) : error);
});


const commonConfig = (link) => {
  return {
    url: link.href,
    method: link.method ? link.method : 'GET',
    headers: link.method && link.method !== 'GET' ? {
      'Content-Type': link.contentType ? link.contentType : 'application/json'
    } : {},
    transformResponse: [(data) => {
      return data;
    }],
    withCredentials: true,
    validateStatus: (status) => {
      // `validateStatus` defines whether to resolve or reject the promise for a given
      // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
      // or `undefined`), the promise will be resolved; otherwise, the promise will be
      // rejected.

      if (status === 403) {
        // showErrorNotification({title: 'Access denied', message: 'You are forbidden from performing this operation'});
      }
      // TODO: Handle network connectivity and authorization failure related responses based on the status codes
      return status >= 200 && status < 300; // default
    }
  };
};

export const fetchLink = (link, data) => {
  const config = commonConfig(link);
  if (data) {
    config.data = data;
  }
  if (link.responseType) {
    config.responseType = link.responseType;
  }
  return axios(config);
};
