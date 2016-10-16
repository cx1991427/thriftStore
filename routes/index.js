const goods=require("./goods");

const constructorMethod = (app) => {
    app.use("/goods", goods);
   
    app.use("*", (req, res) => {
        res.json({error:"no res"});
    })
};

module.exports = constructorMethod;