const express = require("express");
const router = express.Router();

const AuthController = require ("../controllers/AuthControllers");

router.post("/login", AuthController.login);
router.post("/cadastro", AuthController.cadastro);

module.exports = router;