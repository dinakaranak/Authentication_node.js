const Router = require("express")

const router = Router()

//admintasks

router.post("/createadmin",require("../Controllers/authController").createadmin);
router.post("/loginadmin",require("../Controllers/authController").loginadmin);

module.exports = router