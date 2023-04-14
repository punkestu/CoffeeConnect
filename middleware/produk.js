const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, "storage");
    },
    filename: function (req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        req.body.picture = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({storage});

module.exports = {
    save: {
        picture: upload.single("picture")
    }
}