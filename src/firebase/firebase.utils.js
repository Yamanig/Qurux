import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAq7JiZpv7OKRURF9rz1Gxdvr8q4Ca89aI',
  authDomain: 'qurux-db.firebaseapp.com',
  databaseURL: 'https://qurux-db.firebaseio.com',
  projectId: 'qurux-db',
  storageBucket: 'qurux-db.appspot.com',
  messagingSenderId: '932903602564',
  appId: '1:932903602564:web:467c2f7827c0b3ff8135d1',
  measurementId: 'G-QH9F5VFWNB',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`/users/${userAuth.uid}`);

  const userSnapShot = await userRef.get();

  if (!userSnapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
