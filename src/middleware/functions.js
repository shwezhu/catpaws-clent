import fs from "fs";
import multer from "multer";
import path from "node:path";

function getMulter(req, res, next) {
    const media_dir = './uploads';

    if (!fs.existsSync(media_dir)){
        fs.mkdirSync(media_dir);
    }

    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, media_dir);
        },
        filename: function(req, file, cb) {
            const uniqueSuffix = file.fieldname + '-' + Date.now();
            cb(null, uniqueSuffix + path.extname(file.originalname));
        }
    });

    return multer({ storage: storage });
}

function validateCredentials(req, res, next) {
    // object destructuring.
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).send("Error: Missing username or password");
        return;
    }
    next();
}

export { validateCredentials, getMulter };

