import {initializeApp} from 'firebase/app'
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'
import { getAuth } from 'firebase/auth';



const firebaseConfig = {
    apiKey: "AIzaSyCZKjxfUhcHBNlfT2RBLPLdnnepw1Mf6Fs",
    authDomain: "twitter2-efeea.firebaseapp.com",
    projectId: "twitter2-efeea",
    storageBucket: "twitter2-efeea.appspot.com",
    messagingSenderId: "522508125376",
    appId: "1:522508125376:web:d8698cf3979505a896d925"
  };


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app)


export {db,storage,auth}