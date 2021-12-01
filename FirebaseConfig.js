import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBrjbFpROTIxu2-j2YHezGUeSs00zeyZrE",
  authDomain: "react-native-69e51.firebaseapp.com",
  databaseURL: "https://react-native-69e51-default-rtdb.firebaseio.com",
  projectId: "react-native-69e51",
  storageBucket: "",
};

const firebaseApp=firebase.initializeApp(firebaseConfig);

export default firebaseApp;