import firebase from "firebase/compat/app"
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from "firebase/firestore";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"

import "firebase/auth"


firebase.initializeApp({
  apiKey: "AIzaSyDQ1zWSmyVF-av959fFqcM_Rg_qvCqfQvI",
  authDomain: "chat-ef5d3.firebaseapp.com",
  projectId: "chat-ef5d3",
  storageBucket: "chat-ef5d3.appspot.com",
  messagingSenderId: "394184987411",
  appId: "1:394184987411:web:4e9c9149545baf875340e6",
  measurementId: "G-Z7RKNEW586"
}) 


export const auth = getAuth()
export const storage = getStorage()
export const firestore = getFirestore()
