var logger = require('../logConfig');
var connection = require('../sqlConfig');
var Response = require('./response');

function addProduct(req, res) {
    //打印请求报文
    logger.info(req.body);
    var param = req.body;
    var productName = param.productName;
    var productPrice = param.productPrice;
    var productType = param.productType;
    var productImg = param.productImg;
    var productDes = param.productDes;
    var response = new Response(false, '', -1);
    if (productName && productPrice && productType && productImg && productDes) {
        //1、查看数据库中是否有相同用户名
        connection.query("insert into t_product (p_name, p_price, p_type,p_img,p_des) VALUES(?,?,?,?,?)", [productName, productPrice, 
            productType, productImg, productDes], function (error, results, fields) {
            if (error) throw error;
            //3、如果没有相同用户名，并且有一条记录，则注册成功
            if (results.affectedRows == 1) {
                response = new Response(false, '添加成功', 1, null);
                logger.info(response);
                res.send(response);
            } else {
                response = new Response(false, '添加成功', -1, null);
                logger.info(response);
                res.send(response);
            }
        });
    } else {
        response = new Response(false, '有参数为空', -1);
        logger.info(response);
        res.send(response);
    }
}

module.exports = addProduct;
