var logger = require('../logConfig');
var connection = require('../sqlConfig');
var Response = require('./response');


function updateProduct(req, res) {
    //打印请求报文
    logger.info('xxxxxx更新===' + req);
    var param = req.body;
    var productId = param.productId;
    var productName = "'" + param.product_name + "'";
    var productType = param.product_type;
    var productPrice = param.product_price;
    var productImg = "'" + param.product_img + "'";
    var productDes = "'" + param.product_des + "'";
    var response = new Response(false, '', -1, []);
    if (productId != '') {
        connection.query("update t_product set p_name =" + productName +
            ",p_type = " + productType +
            ",p_price = " + productPrice +
            ",p_img = " + productImg +
            ",p_des = " + productDes +
            " where pid = " + productId, function (error, results, fields) {
                if (error) throw error;
                response = new Response(true, '更新成功', 1, results);
                logger.info(response);
                res.send(response);
            });
    } else {
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

