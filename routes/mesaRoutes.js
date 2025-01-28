const express = require('express');
const router = express.Router();
const MesaController = require('../controllers/MesaController');
const AuthController = require('../controllers/AuthController');


router.post('/novo', AuthController.autenticar, AuthController.autenticarAdm , MesaController.cadastro); 
router.get("/", MesaController.buscarMesas);
router.get("/disponibilidade", MesaController.buscarMesaporData);

module.exports = router