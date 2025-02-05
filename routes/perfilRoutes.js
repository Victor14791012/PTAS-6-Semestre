const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const PerfilController = require('../controllers/PerfilController');

router.get('/', AuthController.autenticar, PerfilController.perfil);
router.patch('/', AuthController.autenticar, PerfilController.atualizarPerfil);
router.get('/todos',AuthController.autenticar, AuthController.autenticarAdm, PerfilController.buscarUsuarios);



module.exports = router