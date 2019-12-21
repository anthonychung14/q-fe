// THIS DOESN'T BELONG. REMOVE MEEEEEE
const prodConfig = {
  apiKey: 'AIzaSyCkL35_BzawiRwTdI7fA2OBi01daQnqF-E',
  authDomain: 'sentinel-ffe3b.firebaseapp.com',
  databaseURL: 'https://sentinel-ffe3b.firebaseio.com',
  projectId: 'sentinel-ffe3b',
  storageBucket: 'sentinel-ffe3b.appspot.com',
  messagingSenderId: '256224644335',
  appId: '1:256224644335:web:1c11227f36f355060bdf1a',
  measurementId: 'G-SN5CX8M7KW',
};

const devConfig = {
  apiKey: 'AIzaSyCkL35_BzawiRwTdI7fA2OBi01daQnqF-E',
  authDomain: 'sentinel-ffe3b.firebaseapp.com',
  databaseURL: 'https://sentinel-ffe3b.firebaseio.com',
  projectId: 'sentinel-ffe3b',
  storageBucket: 'sentinel-ffe3b.appspot.com',
  messagingSenderId: '256224644335',
  appId: '1:256224644335:web:1c11227f36f355060bdf1a',
  measurementId: 'G-SN5CX8M7KW',
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export { config };
