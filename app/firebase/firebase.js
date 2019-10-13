// THIS DOESN'T BELONG. REMOVE MEEEEEE
const prodConfig = {
  apiKey: 'AIzaSyDcV3_wB9_8oQem2fyoA7V71Nzo9oW3X4A',
  appName: 'q-shadow',
  authDomain: 'shadow-self.firebaseapp.com',
  databaseURL: 'https://shadow-self.firebaseio.com',
  projectId: 'shadow-self',
  storageBucket: 'shadow-self.appspot.com',
  messagingSenderId: '597390864622',
};

const devConfig = {
  apiKey: 'AIzaSyDcV3_wB9_8oQem2fyoA7V71Nzo9oW3X4A',
  appName: 'q-shadow',
  authDomain: 'shadow-self.firebaseapp.com',
  databaseURL: 'https://shadow-self.firebaseio.com',
  projectId: 'shadow-self',
  storageBucket: 'shadow-self.appspot.com',
  messagingSenderId: '597390864622',
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export { config };
