const express = require('express');
const router = express.Router();
const controllerPerfil = require('../controller/controllerPerfil');
const auth = require("../middleware/authMiddleware");

//router.get('/:id',auth.logged,controllerPerfil.principal);
router.get('/:id',controllerPerfil.principal);
// /perfil/3/editar


module.exports=router;
