const User= require('../models/User');

module.exports.signupPage= (req,res)=>{
    res.render('signup');
}

module.exports.signup= async(req,res,next)=>{
    try{
        const {name,username,password,email,phone}=req.body;
        const user= new User({name,username,email,phone});
        const registeredUser= await User.register(user,password);
        req.login(registeredUser,err=>{
          if(err){
            return next(err);
          }
          req.flash("success","ACCOUNT CREATED SUCCESSFULLY");
          res.redirect('/home');
        });
      }catch(e){
        console.log(e);
        res.redirect('/register');
    }
}

module.exports.loginPage=(req,res)=>{
    if(req.user){
        req.flash("info","ALready Login");
        res.redirect('/home');
    }else{
        res.render('login');
    }
}

module.exports.login=(req,res)=>{
    req.flash('success','SUCCESSFULLY LOGIN');
    res.redirect('/home');
}

module.exports.logout=(req,res,next)=>{
    req.logout(function (err){
        if(err){
            return next(err);
        }
        req.flash('success','LOGGED OUT SUCCESSFULLY');
        res.redirect('/login');
    });
}