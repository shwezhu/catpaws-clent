import User from "../model/user.js";

async function createUser(username, password) {
    const newUser = new User({
        username: username,
        password: password,
    });

    await newUser.save();
}

export {createUser}
