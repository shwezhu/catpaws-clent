import http from 'node:http';
import express from 'express';
import mongoose from "mongoose";
import {register, login} from "./handlers/auth.js";
import {validateCredentials} from "./middleware/functions.js";

const app = express();

async function main() {
    await mongoose.connect('mongodb://localhost:27017/catpaws', {
        serverSelectionTimeoutMS: 2000,
    });

    // parse request body into req.body, if request has Content-Type: application/json
    app.use(express.json());
    // parse request body into req.body, if request has Content-Type: application/x-www-form-urlencoded
    app.use(express.urlencoded({extended: true}));

    app.post('/auth/register', validateCredentials, register);
    app.post('/auth/login', validateCredentials, login);

    app.listen(3000, () => {
        console.log('Server listening on port 3000');
    });
}

main().catch((err) => {
    console.error('Error starting server:', err);
    process.exit(1);
});