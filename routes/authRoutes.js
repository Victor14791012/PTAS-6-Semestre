const AuthControllers = require("../controllers/AuthControllers");

const router = require ("express").router();

const AuthControllers

router.post("/cadastro", AuthControllers.cadastro);
router.post("/login", AuthControllers.login);

MediaSourceHandle.exports = router;