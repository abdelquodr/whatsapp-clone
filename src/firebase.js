import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDsHGlagItihIUQF1FG5EcH2FfAuDIEjEs",
    authDomain: "whatsapp-clone-6fdc3.firebaseapp.com",
    projectId: "whatsapp-clone-6fdc3",
    storageBucket: "whatsapp-clone-6fdc3.appspot.com",
    messagingSenderId: "933418262701",
    appId: "1:933418262701:web:9aba014c4644caf39a6624",
    measurementId: "G-40146RDQVE"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;