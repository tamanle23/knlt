import axios from 'axios';

const fbClient = axios.create({
    baseURL: 'https://www.facebook.com/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });

const graphClient = axios.create({
    baseURL: 'https://graph.facebook.com/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

fbClient.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'There is an error!'
    )
);
graphClient.interceptors.response.use(
    (response) => response,
    (error) =>
      Promise.reject(
        (error.response && error.response.data) || 'There is an error!'
      )
  );

export class Fb {
    constructor(version) {
        this.version = version;
    }
};
