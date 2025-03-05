const Router = require("express")

const {createstudent , getstudents} = require("../Controllers/StudentController");
const authController = require('../Controllers/authController')
const router = Router()

//studenttasks
router.post("/createstudent",authController.protect,createstudent);
router.get("/getstudents",authController.protect,getstudents);

module.exports = router