import firebase from 'firebase';
import config from './config.json';
import axios from 'axios';

axios.interceptors.request.use((request) => {
  const token = sessionStorage.getItem('token');
  
  if (token != null) {
      request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
}, (err) => {
  return Promise.reject(err);
});

const firebaseApp = (): void => {
  firebase.initializeApp(config.firebaseConfig);
};

export default firebaseApp;
