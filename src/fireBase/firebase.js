import firebase from "firebase/app";
import 'firebase/auth';

const app = firebase.initializeApp( {
    apiKey: "AIzaSyBgZ3l_m4vHqp9AOHCbJVWpzBNW07GisgI",
    authDomain: "aquarina-001.firebaseapp.com",
    projectId: "aquarina-001",
    storageBucket: "aquarina-001.appspot.com",
    messagingSenderId: "99816599565",
    appId: "1:99816599565:web:bf025587a30465784ba544"
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
