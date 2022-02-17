const fs=require('fs');
let db= require("../database/models");
const { compareSync, hashSync }= require('bcryptjs');
const {validatioResult, validationResult}=require('express-validator');
const { Console } = require('console');

const User = db.User;
const Address = db.Address;

const controllerPages = {
    'home': (req, res) => {
        res.render('pages/home.ejs')
    },
    'login': (req, res) => {
        res.render('pages/login.ejs')
    },
    'loginProcess': (req, res) => {
        let user = db.findMail(req.body.email)
        if(user){
            let confirm = compareSync(req.body.pass,user.password)
            if(!confirm){
                return res.render('pages/login.ejs',{password: !confirm ? "La contraseña ingresada no es correcta" : null, oldEmail: req.body.email})
            }
            req.session.user = user
            req.session.access = user.access
            req.session.cat = user.cat
            return res.redirect("/")
        }else{
            res.render('pages/login.ejs',{email: !user ? "El email ingresado no es correcto" : null})
        }
    },
    'logout': (req,res)=>{
        delete req.session.user
        res.redirect("/")
    },
    'carrito':(req,res) =>{
        res.render('pages/carrito.ejs')
    },
    'register':(req,res) =>{
        res.render('pages/register.ejs')
    },
    'regProcess':(req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.render('pages/register.ejs',{
                errors:errors.mapped(),
                oldData:req.body,
            })
        }
        User.findOne({where: {email:req.body.email}})
         .then(data =>{
            if(data === null){
                console.log("este email es valido");
                User.create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    pass: hashSync(req.body.pass,10),
                    avatar_id: 1,
                    rol_id: req.body.rol
                });
                res.redirect("/")
            }else{
                return res.render('pages/register.ejs',{
                    errors: {
                        email:{
                            msg: "email registrado"
                        }
                    },
                    oldData:req.body,
                });
            }
         })
    },
    'contacto':(req, res) =>{
        res.render('pages/contacto.ejs') 
    },
    'somos':(req, res) =>{
        res.render('pages/somos.ejs') /* res.render muestra el motor de plantilla/ valor */
    }     
}
module.exports = controllerPages;