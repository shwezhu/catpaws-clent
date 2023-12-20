import express from 'express';
import mongoose from "mongoose";
import fs from 'fs';
import path from "node:path";
import {register, login, logout} from "./handlers/auth.js";
import {getMulter, validateCredentials} from "./middleware/functions.js";
import {createPost, getPosts} from "./handlers/post.js";

const upload = getMulter();
const app = express();

async function main() {
    await mongoose.connect('mongodb://localhost:27017/catpaws', {
        serverSelectionTimeoutMS: 2000,
    });

    // Parse request body into req.body, if request has Content-Type: application/json.
    app.use(express.json());
    // Parse request body into req.body, if request has Content-Type: application/x-www-form-urlencoded.
    app.use(express.urlencoded({extended: true}));

    // Auth Routes.
    app.post('/auth/register', validateCredentials, register);
    app.post('/auth/login', validateCredentials, login);
    app.post('/auth/logout', logout);

    // Post Routes.
    app.post('/posts', upload.array('file', 6), createPost);
    app.get('/posts', getPosts);

    app.listen(3000, () => {
        console.log('Server listening on port 3000');
    });
}

main().catch((err) => {
    console.error('Error starting server:', err);
    process.exit(1);
});