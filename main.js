import express from 'express';
import  * as env from 'dotenv/config';
import {router} from './router.js';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const cert = '/home/soaresinformatica/.certs/soaresinformatica.dev.br.pem';

const app = express()
const port = 21127
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());
app.use(cors());

app.set('views', path.join('./', 'views')) 
app.set('view engine', 'ejs') 


//importar rotas front-end
app.use('/', router);

//importar rotas backend api

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})