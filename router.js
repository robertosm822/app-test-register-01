"use strict";
import express from 'express';
import sessionStorage from 'sessionstorage-for-nodejs';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import * as env from 'dotenv/config';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';



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


//rotas backend api
//listar todos os artigos
router.get("/articles-json", async (req, res, next) => {
    console.log("'/test' call");
    try {

        const response = await axios.get(process.env.FIREBASE_DATABASE_URL+"/articles/article.json?print=pretty");

        res.send(response.data);
    }
    catch (err) {
        next(err)
    }
})
//cadastrar um artigo via api
router.post('/articles/register', async (req, res)=>{
    const urlReq = process.env.FIREBASE_DATABASE_URL+"/articles/article.json?auth="+process.env.FIREBASE_AUTH_SECRET;
    let restResult='';
    const { 
        id,
        title,
        description,
        url,
        destak_image,
        status,
        date_published
    } = req.body;
    const response = await axios.post(urlReq, {
        id,
        title,
        description,
        url,
        destak_image,
        status,
        date_published
    })
    .then((restobjetc) => {
      console.log(restobjetc.data);
      restResult = restobjetc.data;
    });
    res.send({'status': true, 'data': restResult});
})

import {
    getArticles,
    createArticle,
} from './controllers/ArticlesController.js';

router.get('/articles/', getArticles);
router.post('/articles/new', createArticle);
//rotas front-end
router.get('/', (req, res) => {
    let credential = sessionStorage.getItem('credentials_u' + sessionStorage.getItem('log_i'));
    let userOnline = (typeof credential != undefined && credential != null) ? credential : '';

    res.render('Home', {
        title: 'Inicio',
        userOnline: userOnline
    })
})

router.get('/logout', function (req, res) {
    authUser.signOut().then(() => {
        sessionStorage.removeItem('credentials_u' + sessionStorage.getItem('log_i'));
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
            console.log(user);
            res.locals.currentUser = user;
            sessionStorage.setItem('credentials_u' + user.uid, user.email);
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