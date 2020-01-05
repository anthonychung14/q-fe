// THIS DOESN'T BELONG. REMOVE MEEEEEE
const prodConfig = {
  apiKey: 'AIzaSyBYNePtTwiGzLGZiHynWYPG0ukK2QOh14k',
  authDomain: 'provisor-0-1.firebaseapp.com',
  databaseURL: 'https://provisor-0-1.firebaseio.com',
  projectId: 'provisor-0-1',
  storageBucket: 'provisor-0-1.appspot.com',
  messagingSenderId: '740065134914',
  appId: '1:740065134914:web:362a707480c7c98845a0db',
  measurementId: 'G-LL448LHM60',
};

const devConfig = {
  apiKey: 'AIzaSyBYNePtTwiGzLGZiHynWYPG0ukK2QOh14k',
  authDomain: 'provisor-0-1.firebaseapp.com',
  databaseURL: 'https://provisor-0-1.firebaseio.com',
  projectId: 'provisor-0-1',
  storageBucket: 'provisor-0-1.appspot.com',
  messagingSenderId: '740065134914',
  appId: '1:740065134914:web:362a707480c7c98845a0db',
  measurementId: 'G-LL448LHM60',
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export { config };
