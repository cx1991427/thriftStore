var express = require('express');
var router = express.Router();
var csrf=require('csurf');
var passport=require("passport");
var Cart=require("../models/cart");

var multer=require("multer");
var upload = multer({dest: "./public/uploads"});

var Product=require("../models/product");
var mongoose=require("mongoose");

var csrfProtection=csrf();
// router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err,docs){
    var productChunks=[];
    var chunkSize=3;
    for(var i=0;i<docs.length;i+=chunkSize){
      productChunks.push(docs.slice(i,i+chunkSize))
    }
    res.render('index', {title: 'Thrift Store!', products:productChunks});
  });
});

router.get("/upload",function(req,res){
  res.render("user/upload");
});

router.post("/upload",upload.single("avatar"),function(req,res){
  var product=new Product({
    imagePath:"/uploads/"+req.file.filename,
    title:req.body.title,
    description:req.body.description,
    price:parseFloat(req.body.price)
});
  product.save(function(err,result){
    if(err) return console.error(err);
  });
  res.redirect("/");
});

router.get("/add-to-cart/:id",function(req,res,next){
  var productId=req.params.id;
  var cart=new Cart(req.session.cart ? req.session.cart:{});

  Product.findById(productId,function (err,product) {
    if(err){
      return res.redirect("/");
    }
    cart.add(product,product.id);
    req.session.cart=cart;
    console.log(req.session.cart);
    res.redirect("/");
  });
});

router.get("/shopping-cart",function(req,res,next){
  if(!req.session.cart){
    return res.render("shop/shopping-cart",{products:null});
  }
  var cart=new Cart(req.session.cart);
  res.render("shop/shopping-cart",{products:cart.generateArray(),totalPrice:cart.totalPrice});
});

router.get("/checkout",function (req,res,next) {
  if(!req.session.cart){
    return res.redirect("/shopping-cart");
  }
  var cart=new Cart(req.session.cart);
  res.render("shop/checkout",{total:cart.totalPrice});
});

router.get("/profile",isLoggedInFunction,function (req,res,next) {
  res.render("user/profile",{"user":req.user});
});

router.get("/logout",isLoggedInFunction, function (req,res,next) {
  req.logout();
  res.redirect("/");
});

router.use("/",notLoggedIn, function (req,res,next) {
  next();
});

router.get("/signup",function(req,res,next) {
  var messages=req.flash("signupMessage");
  // res.render('user/signup',{csrfToken:req.csrfToken(),messages:messages,hasErrors:messages.length>0});
  res.render('user/signup',{messages:messages,hasErrors:messages.length>0});
});

router.post("/signup",passport.authenticate("local.signup",{
  successRedirect:"/profile",
  failureRedirect:"/signup",
  failureFlash:true
}));

router.get("/signin",function (req,res,next) {
  var messages=req.flash("signinMessage");
  // res.render('user/signin',{csrfToken:req.csrfToken(),messages:messages,hasErrors:messages.length>0});
  res.render('user/signin',{messages:messages,hasErrors:messages.length>0});
});

router.post("/signin",passport.authenticate("local.signin",{
  successRedirect:"/profile",
  failureRedirect:"/signin",
  failureFlash:true
}));

module.exports = router;









function isLoggedInFunction(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}

function notLoggedIn(req,res,next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}