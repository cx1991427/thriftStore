const goods=require("./goods");

// let constructorMethod=(app)=>{
//     app.use("/goods",goods);

//     app.use("*",(req,res)=>{
//         res.status(404);
//         res.json({error:"not found"});
//     })
// };

module.exports={
    goods:require("./goods")
};
