const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const goods = data.goods;

dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;
    }).then((db) => {
        return goods.addGoods("iphone7", 600);
    })
});
