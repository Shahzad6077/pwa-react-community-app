// Hook (use-auth.js)
import React, { useState, useEffect, useContext, createContext } from "react";

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/firestore";

import firebaseConfig from "./../Services/fbConfig";

// const firebaseConfig = {
//   apiKey: `${process.env.REACT_APP_FB_API_KEY}`,
//   authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
//   databaseURL: `${process.env.REACT_APP_DB_URL}`,
//   projectId: `${process.env.REACT_APP_FB_PROJ_ID}`,
//   storageBucket: `${process.env.REACT_APP_FB_STORAGE_BUCKET}`,
//   messagingSenderId: `${process.env.REACT_APP_FB_MSG_SENDER_ID}`,
//   appId: `${process.env.REACT_APP_FB_APP_ID}`,
//   measurementId: `${process.env.REACT_APP_FB_MEASUREMENT_ID}`,
// };

// Add your Firebase credentials
firebase.initializeApp(firebaseConfig);
export const fbFirestore = firebase.firestore;
export const fbCloudDb = firebase.firestore();
export const fbStorage = firebase.storage();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const firebaseInstance = firebase;

const authContext = createContext();

const getProvider = provider => {
  switch (provider) {
    case "email":
      return new firebase.auth.EmailAuthProvider();
    case "facebook":
      return new firebase.auth.FacebookAuthProvider();
    case "github":
      return new firebase.auth.GithubAuthProvider();
    case "google":
      return new firebase.auth.GoogleAuthProvider();
    case "twitter":
      return new firebase.auth.TwitterAuthProvider();
    default:
      throw new Error("Provider is not supported!!!");
  }
};

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const signup = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  const sendPasswordResetEmail = email => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

  const createUserDoc = (id, data) => {
    return fbCloudDb
      .collection("users")
      .doc(id)
      .set(data);
  };
  const loginWithProvider = p => {
    const provider = getProvider(p);
    return firebase.auth().signInWithPopup(provider);
  };
  const updateUserProfile = obj => {
    return firebase.auth().currentUser.updateProfile(obj);
  };
  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    setLoading(true);
    const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
      setLoading(true);
      if (user) {
        const email = user.email;
        const photoUrl = user.photoURL;
        const emailVerified = user.emailVerified;
        const uid = user.uid;
        const displayName = email.split("@")[0];
        setUser({ displayName, email, photoUrl, emailVerified, uid });
        setLoading(false);
      } else {
        setLoading(false);
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    loading,
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    setUser,
    updateUserProfile,
    loginWithProvider,
    createUserDoc
  };
}
