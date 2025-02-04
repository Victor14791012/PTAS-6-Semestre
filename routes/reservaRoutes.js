const express = require('express');
const router = express.Router();
const MesaController = require('../controllers/MesaController');
const AuthController = require('../controllers/AuthController');
const ReservaController = require('../controllers/ReservaController');


router.post('/novo',AuthController.autenticar, ReservaController.novaReserva);
router.post('/minhas_reservas', AuthController.autenticar, ReservaController.minhasReservas);
router.patch('/minhas_reservas', AuthController.autenticar, ReservaController.cancelar);
router.get('/list', AuthController.autenticar, AuthController.autenticarAdm, ReservaController.minhasReservasporData);
router.patch("/atualizar", AuthController.autenticar, ReservaController.atualizarReserva )

module.exports = router