import firebase from "firebase/compat/app"
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

firebase.initializeApp({
  apiKey: "AIzaSyDQ1zWSmyVF-av959fFqcM_Rg_qvCqfQvI",
  authDomain: "chat-ef5d3.firebaseapp.com",
  projectId: "chat-ef5d3",
  storageBucket: "chat-ef5d3.appspot.com",
  messagingSenderId: "394184987411",
  appId: "1:394184987411:web:4e9c9149545baf875340e6",
  measurementId: "G-Z7RKNEW586"
}) 

export const auth = firebase.auth()
export const storage = firebase.storage()
export const firestore = firebase.firestore()
