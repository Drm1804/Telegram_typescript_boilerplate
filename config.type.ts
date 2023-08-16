export type Config = {
  authFirebase: {
    email: string;
    password: string;
  };
  firebase: {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
  botToken: string;
  storagePath: string;
};
