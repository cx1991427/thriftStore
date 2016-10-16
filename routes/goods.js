const express = require('express');
const router = express.Router();
const data = require("../data");
const goods = data.goods;

router.get("/", (req, res) => {
		goods.getAllGoods().then((goodsArray)=>{
			// res.json({"key":"goods"});
			res.json(goodsArray);
		})
});

module.exports=router;