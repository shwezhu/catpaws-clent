import express from 'express';
import mongoose from "mongoose";
import session from 'express-session';
import fs from 'fs';
import path from "node:path";
import {register, login, logout} from "./handlers/auth.js";
import {getMulter, validateCredentials, isAuthenticated, setMiddlewares} from "./middleware/functions.js";
import {handleCreatePost, getPosts} from "./handlers/post.js";
const __dirname = path.resolve();

const upload = getMulter();
const app = express();

async function main() {
    await mongoose.connect('mongodb://localhost:27017/catpaws', {
        serverSelectionTimeoutMS: 2000,
    });

    setMiddlewares(app);

    app.get('/', isAuthenticated, (req, res) => {
        res.sendFile('index.html', { root: path.join(__dirname, 'client') });
    });

    // Auth Routes.
    app.post('/auth/register', validateCredentials, register);
    app.post('/auth/login', validateCredentials, login);
    app.get('/auth/login', (req, res) => {
        res.send("login page");
    });
    app.post('/auth/logout', logout);

    // Post Routes.
    app.post('/posts', isAuthenticated ,upload.array('file', 6), handleCreatePost);
    app.get('/posts', getPosts);

    app.listen(8080, () => {
        console.log('Server listening on port 8080');
    });
}

main().catch((err) => {
    console.error('Error starting server:', err);
    process.exit(1);
});