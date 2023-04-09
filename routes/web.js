const router = require("express").Router();

router.get("/", function (_,res) {
    res.render("index");
})

module.exports = router;