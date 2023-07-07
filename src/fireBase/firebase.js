import firebase from "firebase/app";
import 'firebase/auth';

const app = firebase.initializeApp( {
    apiKey: "AIzaSyCGyF_r-yjAGFfCQhdhoTGic4TyFmEkRMc",
    authDomain: "aquarina-8527c.firebaseapp.com",
    projectId: "aquarina-8527c",
    storageBucket: "aquarina-8527c.appspot.com",
    messagingSenderId: "318014606824",
    appId: "1:318014606824:web:7919d3165ffc734652685d"
    // apiKey: "AIzaSyBsNAYte-6usdohgVPsKNoGtrWFx75mz_g",
    // authDomain: "expensetracker-6e5ba.firebaseapp.com",
    // projectId: "expensetracker-6e5ba",
    // storageBucket: "expensetracker-6e5ba.appspot.com",
    // messagingSenderId: "259707873994",
    // appId: "1:259707873994:web:76133db07be3513da02233",
    // measurementId: "G-5Z284HHHEV"
});
export const auth = app.auth();
export default app; 
