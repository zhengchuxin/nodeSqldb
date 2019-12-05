var logger = require('../logConfig');
var connection = require('../sqlConfig');
var Response = require('./response');


function updateProduct(req, res) {
    //打印请求报文
    logger.info(req.body);
    var param = req.body;
    var productId = param.productId;
    var productName = "'" + param.productName +"'";
    var productType = param.productType;
    var productPrice = param.productPrice;
    var productImg = "'" + param.productImg + "'";
    var productDes = "'" + param.productDes + "'";
    var response = new Response(false, '', -1, []);
    if (productId != '') {
        connection.query("update product set product_name =" + productName +
            ",product_type = " + productType +
            ",product_price = " + productPrice +
            ",product_img = " + productImg +
            ",product_des = " + productDes +
            " where product_id = " + productId, function (error, results, fields) {
                if (error) throw error;
                response = new Response(true, '更新成功', 1, results);
                logger.info(response);
                res.send(response);
            });
    }else{
        res.send('没有商品id');
    }
}
module.exports = updateProduct;




// function updateProduct(req, res) {
//     //打印请求报文
//     logger.info(req.body);
//     var productId = 1;
//     var response = new Response(false, '', -1, []);

//     const sqlStr = 'update product set ? where product_id = ?'
//     if (productId != '') {
//         connection.query(sqlStr, [req.body, productId], function (error, results, fields) {
//             if (error) throw error;
//             response = new Response(true, '更新成功', 1, results);
//             logger.info(response);
//             res.send(response);
//         });
//     }
// }
// module.exports = updateProduct;

