"use strict";
import express from 'express';
import sessionStorage from 'sessionstorage-for-nodejs';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import  * as env from 'dotenv/config';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";



const router = express.Router();

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
const authUser = getAuth(firebase);
const user = authUser.currentUser;


router.get('/', (req, res) => {
    let credential = sessionStorage.getItem('credentials_u'+sessionStorage.getItem('log_i'));
    let userOnline = (typeof credential != undefined && credential != null) ? credential : '';
   
    res.render('Home', { 
        title: 'Inicio',
        userOnline: userOnline
    }) 
})

router.get('/logout', function (req, res) {
    authUser.signOut().then(() => {
        sessionStorage.removeItem('credentials_u'+sessionStorage.getItem('log_i'));
        sessionStorage.removeItem('log_i');
        res.redirect('/login');
    }).catch((error) => {
        console.log(error);
    });
});


router.get('/register', (req, res) => {
    res.render('Register', { 
        title: 'Registrar-se'
    }) 
})

router.get('/login', (req, res) => {
    
    res.render('Login', { 
        title: 'Entrar'
    }) 
})

router.post('/logar-se', async (req, res) => {
    const { email, password } = req.body;
    signInWithEmailAndPassword(authUser, email, password)
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



router.post('/register', (req, res) => {
    try {
        const { email, username, password } = req.body;
        createUserWithEmailAndPassword(authUser, email, password)
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

export { router }