import {createPost} from "../db/functions.js"

// todo: check if user is logged in, user id, etc.
function handleCreatePost(req, res) {
    const text = req.body.text;
    const filePaths = req.files.map((file) => file.path);
    createPost("11111", text, filePaths)
        .then(
            (doc) => {
                res.status(201).send('post created successfully.');
            }
        )
        .catch(
            (err) => {
                res.status(500).send(`internal error:${err}`);
            }
        )
    //console.log(`Creating new post with title: ${title} and body: ${body}`);
}

function getPosts(req, res) {

}

export {handleCreatePost, getPosts};