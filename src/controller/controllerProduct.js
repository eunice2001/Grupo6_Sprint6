// const path = require("path")
// //let db = require("../database/models");
// //const sequelize = db.sequelize;
// const {Op} = require("sequelize");
// const controllerImage = require("./controllerImage") 

//llamamos los modelos
// const Product = db.Product;
// const Cat = db.Cat;
// const Size = db.Size;
// const Discount = db.Discount;

//eliminar fs,jsonDb y db al finalizar
//const fs=require('fs');
//let jsonDb=require('../model/mainJson.js');
//let db=jsonDb('products');

const db = require("../database/models");
const controllerImage = require("./controllerImage")

//LLAMAMOS A LOS MODELOS
const Product = db.Product;
const Cat = db.Cat;
const Size = db.Size;
const Discount = db.Discount;
const Image = db.Images;


const controllerProduct={
    productos:(req, res) =>{
        Product.findAll({
            include: ["images"]
        })
        .then(products =>{
            console.log(products);
            res.render('pages/productos.ejs',{db:products})
        })
    },
    create:(req,res)=>{
        res.render('admin/product/addProduct.ejs')
    },
    crearAccion:(req,res)=>{
        let body = req.body;
        Product.create({
            name: req.body.name,
            price_inv: req.body.price_inv,
            price_who: req.body.price_who,
            stock: req.body.stock,
            stock_min: req.body.stock_min,
            stock_max: req.body.stock_max,
            cat_id: req.body.category,
            size_id: req.body.size,
            discount_id: req.body.discount,
            description: req.body.description,
            visibility: req.body.visibility
        })
        .then(producto =>{
            console.log(producto.id);
            controllerImage.file(producto.id,req.file.filename)
            res.redirect('/products');

        })
        .catch(e => console.log("el error es: "+ e));
    },
    edit:(req,res)=>{
        let id=req.params.id;
        const buscar=db.buscar(id);
        res.render('admin/product/editProduct.ejs',({productoEncontrado:buscar}))
    },
    update:(req,res)=>{
        let id=req.params.id;
        const buscar=db.buscar(id);
        let body = req.body;
        body.id = buscar.id;
        body.img = req.file.filename;
        // let objetoNew={
        //     "id":buscar.id,
        //     "name":req.body.name,
        //     "precio":req.body.precio,
        //     "descripcion":req.body.descripcion,
        //     "img":" ",
        //     "peso":req.body.peso,
        //     "tamanio":req.body.tamanio,
        //     "cat":req.body.cat,
        //     "offPorcen":req.body.offPorcen,
        //     "cantidad":req.body.cantidad,
        // }
        db.actualizar(body);
        res.redirect("/")
    },
    productDelete:(req,res)=>{
        db.eliminar(req.params.id);
        res.redirect('/');
    },
    productDetail:(req, res) =>{
        Product.findByPk(req.params.id)
         .then(product =>{
             //let imageProduct = controllerImage.list(req.params.id)
             res.render('pages/productDetail.ejs',{articulo:product})
         })
    }
};
module.exports=controllerProduct;