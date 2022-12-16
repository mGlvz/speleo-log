import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD3fz4HBWGsqn_KmkWzxtu756RpcLtLLKw",
    authDomain: "speleo-log.firebaseapp.com",
    projectId: "speleo-log",
    storageBucket: "speleo-log.appspot.com",
    messagingSenderId: "682542434574",
    appId: "1:682542434574:web:601ab7bfaefd5269f56f5f"
  };

  const fireDb = firebase.initializeApp(firebaseConfig);
  export default fireDb.database().ref();