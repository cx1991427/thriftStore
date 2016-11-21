var express = require('express');
var router = express.Router();
var csrf=require('csurf');
var passport=require("passport");
var Cart=require("../models/cart");

var Product=require("../models/product");

var csrfProtection=csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err,docs){
    var productChunks=[];
    var chunkSize=3;
    for(var i=0;i<docs.length;i+=chunkSize){
      productChunks.push(docs.slice(i,i+chunkSize))
    }
    res.render('shop/index', {title: 'Thrift Store!', products:productChunks});
  });
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

router.get("/profile",isLoggedIn,function (req,res,next) {
  res.render("user/profile");
});

router.get("/logout",isLoggedIn, function (req,res,next) {
  req.logout();
  res.redirect("/");
});

router.use("/",notLoggedIn, function (req,res,next) {
  next();
});

router.get("/signup",function(req,res,next) {
  var messages=req.flash("error");
  res.render('user/signup',{csrfToken:req.csrfToken(),messages:messages,hasErrors:messages.length>0});
});

router.post("/signup",passport.authenticate("local.signup",{
  successRedirect:"/profile",
  failureRedirect:"/signup",
  failureFlash:true
}));

router.get("/signin",function (req,res,next) {
  var messages=req.flash("error");
  res.render('user/signin',{csrfToken:req.csrfToken(),messages:messages,hasErrors:messages.length>0});
});

router.post("/signin",passport.authenticate("local.signin",{
  successRedirect:"/profile",
  failureRedirect:"/signin",
  failureFlash:true
}));



module.exports = router;

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}

function notLoggedIn(req,res,next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect();
}