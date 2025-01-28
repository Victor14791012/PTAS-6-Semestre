const express = require('express');
const router = express.Router();
const MesaController = require('../controllers/MesaController');
const AuthController = require('../controllers/AuthController');
const ReservaController = require('../controllers/ReservaController');


router.post('/novo', AuthController.autenticar, ReservaController.novaReserva);
router.post('/minhas_reservas', AuthController.autenticar, ReservaController.minhasReservas);


module.exports = router