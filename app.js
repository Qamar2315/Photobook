//importing node modules
const express= require('express');
const app= express();
const path= require('path');
const mongoose = require('mongoose');
const ejsMate= require('ejs-mate');
const AppError=require('./utilities/AppError')
const methodOverride= require('method-override')
const passport= require('passport');
const LocalStrategy= require('passport-local');
const session= require('express-session')
const MongoStore= require('connect-mongo');
const flash= require('connect-flash');

//User Model For Passport Setting
const User= require('./models/User')

//routes
const user= require('./routes/user');
const profile= require('./routes/profile');
const home= require('./routes/home');
const post= require('./routes/post');
const comment= require('./routes/comment');

//connecting database
main().catch(err => console.log(err))
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/photobook');
  console.log("connected");
}

//setting engine and setting views and public directory
app.engine('ejs',ejsMate);
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')))
app.use('/assets',express.static('assets'));
app.set('view engine','ejs');

//setting mongostore for saving sessions
const store= MongoStore.create({
  mongoUrl:'mongodb://127.0.0.1:27017/photobook',
  secret:'thisisfun',
  touchAfter: 24*60*60
})
store.on("error", function(e){
  console.log("THIS IS ERROR : ", e);
})

//configuring session
const sessionConfig={
  store,
  name : "photobook_sessionId",
  secret:'key1234567',
  resave:false,
  saveUnitialized: true,
  cookie:{
      httpOnly: true,
      //secure:true,
      expires: Date.now() + (1000*60*60*24*7),
      maxAge: 1000*60*60*24*7
  }
}

//setting session,flash,method-override,passport
app.use(express.urlencoded({extended:true}));
app.use(session(sessionConfig));
app.use(flash());
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//setting locals
app.use((req,res,next)=>{
  res.locals.currentUser=req.user;
  res.locals.success= req.flash('success');
  res.locals.error= req.flash('error');
  res.locals.info= req.flash('info');
  next();
})

//routes
app.use('/',user);
app.use('/profile',profile);
app.use('/home',home);
app.use('/',post);
app.use('/',comment);

//testing page
app.get('/test',(req,res)=>{
  res.render('test4');
})

//error page handler
app.all('*',(req,res,next)=>{
  //throw new AppError("PAGE NOT FOUND",404);
  next(new AppError("PAGE NOT FOUND",404))
})

//error middlewre
app.use((err,req,res,next)=>{
  const {status=500,message='SOMETHING IS WRONG'}= err;
  res.status(status).render('error',{message,status});
})

//server
app.listen(7979,()=>{
    console.log("APP IS LISTENING ON PORT 8080");
})