import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import sessionStorage from 'sessionstorage-for-nodejs';
import  * as env from 'dotenv/config';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const port = 21127
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());


const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MASSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
}
const firebase = initializeApp(firebaseConfig)
const auth = getAuth(firebase);
const user = auth.currentUser;



app.use((req, res, next) => {

    res.locals.currentUser = user;
    next();
})


//endpoints and routes

app.get('/', (req, res) => {
    let credential = sessionStorage.getItem('credentials_u'+sessionStorage.getItem('log_i'));
    
    
    let userOnline = (typeof credential != undefined && credential != null) ? credential : '';
    console.log(res.locals);
    res.send('Hello World! ' + userOnline )
})

app.get('/logout', function (req, res) {
    auth.signOut().then(() => {
        sessionStorage.removeItem('credentials_u'+sessionStorage.getItem('log_i'));
        sessionStorage.removeItem('log_i');
        res.redirect('/login');
    }).catch((error) => {
        console.log(error);
    });
});

app.get('/register', (req, res) => {
    fs.readFile(__dirname + '/index.html', 'utf8', (err, text) => {
        res.send(text);
    });
})

app.get('/login', (req, res) => {
    fs.readFile(__dirname + '/login.html', 'utf8', (err, text) => {
        res.send(text);
    });
})

app.post('/logar-se', async (req, res) => {
    const { email, password } = req.body;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user.email);
            res.locals.currentUser = user;
            sessionStorage.setItem('credentials_u'+user.uid, user.email);
            sessionStorage.setItem('log_i', user.uid);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log({ 'code': errorCode, 'message': errorMessage });
        });
    res.redirect('/');
})



app.post('/register', (req, res) => {
    try {
        const { email, username, password } = req.body;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log({ 'code': errorCode, 'message': errorMessage });
            });

        res.redirect('/');
    } catch (e) {
        console.log(e);
        res.redirect('login');
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})