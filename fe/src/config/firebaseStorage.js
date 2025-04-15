// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAbAF6dRwlYW4kn5EHFHy21lu_7Q6k3h0U',
  authDomain: 'fakebook-5b337.firebaseapp.com',
  projectId: 'fakebook-5b337',
  storageBucket: 'fakebook-5b337.firebasestorage.app',
  messagingSenderId: '664488014066',
  appId: '1:664488014066:web:aa20d3f0f52bd35d3b206b',
  measurementId: 'G-WK65HS5C39',
  
};

// Initialize Firebase
const storage = initializeApp(firebaseConfig);



export const firebaseStorage = getStorage(storage);