const path = require("path")
let db = require("../database/models");
const sequelize = db.sequelize;
const {Op} = require("sequelize");
//llamamos los modelos
const User = db.User
const controllerPerfil={
    'principal':(req,res)=>{
        // db.User.findAll()
        //  .then((a)=>{
        //     res.send(a)
        //  })
        //  .catch(e=> console.log(e))
        User.findByPk(req.params.id)
        .then((user)=>{
             console.log(user);
             res.render('user/perfil.ejs',{title: "Perfil",user:user.dataValues})
         })
    }
}
module.exports=controllerPerfil; 