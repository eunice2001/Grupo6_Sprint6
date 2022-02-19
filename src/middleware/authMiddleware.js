const auth = {
    'logged': (req,res,next)=>{
        if(req.session.user != undefined){
            next();
        }else{
            res.redirect("/login");
        }
    },
    'visited':(req,res,next)=>{
        if(req.session.user != undefined){
            res.redirect("/perfil/"+ req.session.user.id);
        }else{
            next();
        }
    }
}
module.exports = auth;