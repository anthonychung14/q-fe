// THIS DOESN'T BELONG. REMOVE MEEEEEE
const prodConfig = {
  apiKey: 'AIzaSyDRmYJNqFiKC5s-VRwKcCUae5VY100_hPg',
  authDomain: 'centinel-01.firebaseapp.com',
  databaseURL: 'https://centinel-01.firebaseio.com',
  projectId: 'centinel-01',
  storageBucket: 'centinel-01.appspot.com',
  messagingSenderId: '494225617282',
  appId: '1:494225617282:web:c1903e4c0aba74d03f1f9b',
  measurementId: 'G-1KEKRL2QW3',
};

const devConfig = {
  apiKey: 'AIzaSyDRmYJNqFiKC5s-VRwKcCUae5VY100_hPg',
  authDomain: 'centinel-01.firebaseapp.com',
  databaseURL: 'https://centinel-01.firebaseio.com',
  projectId: 'centinel-01',
  storageBucket: 'centinel-01.appspot.com',
  messagingSenderId: '494225617282',
  appId: '1:494225617282:web:c1903e4c0aba74d03f1f9b',
  measurementId: 'G-1KEKRL2QW3',
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export { config };
