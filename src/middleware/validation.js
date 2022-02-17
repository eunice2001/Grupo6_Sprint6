const {body}=require('express-validator');
// const mainJson=require('../model/mainJson')
// const db=mainJson('user');
const db = require('../database/models')
const User = db.User;
const validaciones=[
    body('first_name').notEmpty().withMessage('Nombre obligatorio'),
    body('last_name').notEmpty().withMessage('Nombre obligatorio'),
    body('email').notEmpty().withMessage('Email vacio').bail()
    .isEmail().withMessage('Ingrese mail valido').bail()
    // .custom(value=>{
    //     const emailcheck=db.findMail(value)
    //     if(emailcheck){
    //         throw new Error('El mail esta en uso')
    //     }
    //     return true
    // })
    // .custom(value=>{
    //     console.log("este es el valor "+ value);
    //     User.findOne({where:{email:value}})
    //     .then(response =>{
    //         if(response !== null){
    //             throw new Error('Este email esta en uso')
    //         }
    //         return true
    //     })
    //     .catch(e=> console.log(e));
    //     return true
    // })
    ,
    body('pass').notEmpty().withMessage('Contraseña campo obligatorio').isLength({min:5}).withMessage('La contraseña debe tener minimo 5 caracteres').custom((value,{req})=>{
        if(value!=req.body.pass1){
            throw new Error('Las contraseñas no coinciden')
        }
        return true
    })

]
module.exports=validaciones;