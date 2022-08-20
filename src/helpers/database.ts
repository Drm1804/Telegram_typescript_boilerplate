import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { conf } from '../../config.js';

class DatabaseService {
  app: FirebaseApp
  db: Database

  constructor() {
    try{
      this.app = initializeApp({
        ...conf.firebase
      })

      const auth = getAuth();
      signInWithEmailAndPassword(auth, conf.authFirebase.email, conf.authFirebase.password)
        .catch((error) => {
          console.log(error)
        })

      this.db = getDatabase(this.app);

    } catch(err) {
      console.error('Application works without database!!');
      console.error(err);
    }
  }

  writeMessage(mes: string, time: number): Promise<void> {
    return new Promise((resolve, reject) => {
      set(ref(this.db, 'messages/' + String(time)), {
        mes
      }).then(resolve, reject).catch(reject)
    })
  }
}

const db = new DatabaseService();
export default db;

