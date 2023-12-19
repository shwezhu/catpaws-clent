function validateCredentials(req, res, next) {
    // object destructuring.
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).send("Error: Missing username or password");
        return;
    }
    next();
}

export { validateCredentials };

