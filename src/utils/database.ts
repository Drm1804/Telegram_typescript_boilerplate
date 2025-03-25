import { initializeApp } from 'firebase/app';
import { Database, getDatabase } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { logger } from './logger.js';

let db: Database;
const log = logger('DB');

export const PATH = {
  tasks: '/tasks-schedule/',
  monolog: '/monolog-recognition/',
  ytb: '/youtube-subs/',
};

import { FirebaseOptions } from 'firebase/app';

export async function initDatabase(
  firebase: FirebaseOptions,
  email: string,
  password: string,
): Promise<Database | undefined> {
  log.info('Init DB');
  const app = initializeApp(firebase);
  try {
    await signInWithEmailAndPassword(getAuth(), email, password);
    db = getDatabase(app);
  } catch (err) {
    log.error(err);
  }

  return db;
}

export const getDb = (): Database => db;
