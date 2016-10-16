/**
 * Created by Xiang Cao on 9/30/2016.
 */
const mongoCollections = require("../config/mongoCollections");
const goods=mongoCollections.goods;

let exportedMethods = {
	getAllGoods(){
		return goods().then(goodsCollection=>{
			return goodsCollection.find({}).toArray();
		})
	},
	addGoods(name,price){
		return goods().then((goodsCollection)=>{
			return goodsCollection.insertOne({name:name,price:price});
		})
	}
};
module.exports = exportedMethods;