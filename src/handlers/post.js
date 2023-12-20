// todo: check if user is logged in
function createPost(req, res) {
    const file = req.file;

    console.log(req.files);
    console.log('文本:', req.body.text);

    res.send('帖子已接收');
    //console.log(`Creating new post with title: ${title} and body: ${body}`);
}

function getPosts(req, res) {

}

export {createPost, getPosts};