const prodConfig = {
  apiKey: 'AIzaSyDcV3_wB9_8oQem2fyoA7V71Nzo9oW3X4A',
  authDomain: 'shadow-self.firebaseapp.com',
  databaseURL: 'https://shadow-self.firebaseio.com',
  projectId: 'shadow-self',
  storageBucket: 'shadow-self.appspot.com',
  messagingSenderId: '597390864622',
};

const devConfig = {
  apiKey: 'AIzaSyDcV3_wB9_8oQem2fyoA7V71Nzo9oW3X4A',
  authDomain: 'localhost',
  databaseURL: 'https://shadow-self.firebaseio.com',
  projectId: 'shadow-self',
  storageBucket: 'shadow-self.appspot.com',
  messagingSenderId: '597390864622',
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

// if (!firebase.apps.length) {
//   firebase.initializeApp(config);
// }

// const db = firebase.database();
// const auth = firebase.auth();

export { config };
// export { db, auth, config };
