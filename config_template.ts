import { Config } from './config.type.js';

export const conf: Config = {
  authFirebase: {
    email: '',
    password: '',
  },
  firebase: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
  },
  botToken: '',
  storagePath: `${process.cwd()}/files/`,
};
