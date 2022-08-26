import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBaNjmp5a6luelCHxFki8xsODBB5K7ajLs',
  authDomain: 'instagram-clone-dfd55.firebaseapp.com',
  projectId: 'instagram-clone-dfd55',
  storageBucket: 'instagram-clone-dfd55.appspot.com',
  messagingSenderId: '852825021374',
  appId: '1:852825021374:web:ccbd16e2561f7067fe37ef',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)
const storage = getStorage(app)

export { app, db, storage }
