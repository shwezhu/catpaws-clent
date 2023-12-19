import User from "../model/user.js";
import {createUser} from "../db/functions.js";


// todo: hash password
function register(req, res) {
    const {username, password} = req.body;
    User.findOne({username: username})
        .then(
            (doc) => {
                if (doc) {
                    res.status(400).send("register: username already exists");
                    return;
                }

                createUser(username, password)
                    .then(
                        (doc) => {
                            res.status(201).send("register: user created");
                        }
                    )
                    .catch(
                        (err) => {
                            console.error('Error creating user:', err);
                            res.status(500).send("register: internal error");
                        }
                    )
            }
        )
}

// todo: hash password
function login(req, res) {
    const {username, password} = req.body;
    User.findOne({username: username})
        .then(
            (doc) => {
                if (!doc || doc.password !== password) {
                    res.status(400).send("login: credentials invalid");
                    return;
                }

                res.status(200).send("login: success");
            }
        )
        .catch(
            (err) => {
                console.error('login:', err);
                res.status(500).send("login: internal error");
            }
        )
}

export {register, login};