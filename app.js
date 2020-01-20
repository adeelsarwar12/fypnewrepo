const express = require('express');
const app=express();
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const helmet = require('helmet');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const BlogData = require('./Api/Model/blog')
//initialize passport 
// Passport Config
require('./config/passport')(passport);

//Require Routes Here
const Blogs = require('./Api/Routes/blogs');
const Contact = require('./Api/Routes/contact');
const Admin = require('./Api/Routes/admin');
const agents=require('./Api/Routes/agents')


const Dashborad = require('./Api/Routes/dashboard');
const property = require("./API/routes/property");
const propertyData = require('./API/Model/properties');
const user = require('./Api/Routes/user');
//MongoDb Connection
mongoose.connect(
    "mongodb://localhost/FYP",{ useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true ,useFindAndModify: false }
).then(() => {
    console.log("Connected to Database");
    })
    .catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    });
mongoose.Promise=global.Promise;

//app.use(express_layout);
app.set('views',path.join( __dirname +'/views'));
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.use('/uploads',express.static('uploads'));


app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(helmet());
app.use(methodOverride('_method'));

//For session
app.use(
    session({
      secret: 'ThisIsMySecretKeyOkay',
      resave: true,
      saveUninitialized: true
    })
  );
  
  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Connect flash
  app.use(flash());
  
  // Global variables
  app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });
  
app.use("/property",property);
app.get("/", async (req, res) => {
    let data = await propertyData.find().limit(4)
    console.log(data)
    let blog =await BlogData.find().limit(4)
      res.render('index',{
        data:data,
        property: data,
        blog
      });
    });
  //To Reset Password
app.use('/pass',require('./Api/Routes/resetPassword'));
  
//To render About page
app.get('/aboutus',(req,res)=>{
    res.render('about')
})
//to render Signup page
app.get('/api/signup',(req,res)=>{
    res.render('signup');
})
//To render Login Page
app.get('/api/login',(req,res)=>{
    res.render('login');
})
//to render rooms page
app.get('/rooms',(req,res)=>res.render('booking'));
//For Blog
app.use('/api',Blogs);
//For Contact
app.use('/api',Contact);
//For Admin
app.use('/api/admin',Admin);
app.use('/api/agents',agents)

app.use('/api/user',user)

app.use('/user',user);
app.get('/blog',(req,res)=>{
    res.render('blog')
})

app.get('/temp',(req,res)=>{
    res.render('temp')
})

app.get('/api/sale',async(req,res)=>{
let data=await propertyData.find({purpose:'Sale'})
  res.render('sale',{data})
})
app.get('/api/rent',async (req,res)=>{
  let data=await propertyData.find({purpose:'Rent'})
  res.render('rent',{data})
})
app.get('/blogList',(req,res)=>{
  res.render('blogList')
})
//Fuzzy 

app.get('/api/agents',(req,res)=>{
res.redirect('/api/agents/allagents')
})


app.use('/api/dashboard',Dashborad)

app.use('/api/role',require('./Api/Routes/role'));


//MainPage agents_LookUp
// app.get('/agents',(req,res)=>{
//     res.render('agents')
// })
app.get('/api/blog',async(req,res)=>{
    let Alpha = await BlogData.find()
    res.render('blog', {
        Alpha
    });
})
module.exports=app