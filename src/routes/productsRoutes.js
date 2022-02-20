const express = require('express');
const router = express.Router();

const controllerProduct=require('../controller/controllerProduct');
const controllerAuth = require("../middleware/authMiddleware")
const upload = require('../middleware/multerMiddleware');

//lista los productos
router.get('/', controllerProduct.productos);

//vista del formulario crear

router.get('/create',controllerAuth.admin, controllerProduct.create);
//accion del formulario crear
router.post('/', upload.single('img'), controllerProduct.crearAccion);

router.get('/:id/edit',controllerAuth.admin ,controllerProduct.edit);
router.put('/:id/edit',controllerAuth.admin, upload.single('img'), controllerProduct.update);

router.get('/:id', controllerProduct.productDetail);
//accion eliminar
router.post('/:id',controllerAuth.admin, controllerProduct.productDelete);
module.exports=router;