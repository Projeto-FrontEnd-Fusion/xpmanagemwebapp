// https://frontendfusionservice-default-rtdb.firebaseio.com/

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB8hSXtskBb--RpjldXxzL-tgBTQPpErZA",
  authDomain: "frontendfusionservice.firebaseapp.com",
  databaseURL:"https://frontendfusionservice-default-rtdb.firebaseio.com/",
  projectId: "frontendfusionservice",
  storageBucket: "frontendfusionservice.appspot.com",
  messagingSenderId: "323452689927",
  appId: "1:323452689927:web:21b27ac86911a63e1fd4a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

if(app){
  console.log("Conectado com sucesso")
}

export {db}