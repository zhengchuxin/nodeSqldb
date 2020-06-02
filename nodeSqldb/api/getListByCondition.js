var logger = require('../logConfig');
var connection = require('../sqlConfig');
var Response = require('./response');

function getListByCondition(req, res) {
    //打印请求报文
    logger.info(req.body);
    var param = req.body;
    var productName = "'" + param.productName + "'";
    var productType = param.productType;
    var response = new Response(false, '', -1, []);
    if (productName) {
        connection.query("select * from t_product where p_name = " + productName, function (error, results, fields) {
            if (error) throw error;
            var response = new Response(true, 'productName查询成功', 1, results);
            logger.info(response);
            res.send(response);
        });
    } else if (productType || productType === 0) {
        connection.query("select * from t_product where p_type =" + productType, function (error, results, fields) {
            if (error) throw error;
            var response = new Response(true, 'productType||productType===0 查询成功', 1, results);
            logger.info(response);
            res.send(response);
        });
    } else if (productName && productType) {
        connection.query("select * from t_product where p_name =" + productName + " and p_type = " + productType, function (error, results, fields) {
            if (error) throw error;
            var response = new Response(true, 'productName && productType查询成功', 1, results);
            logger.info(response);
            res.send(response);
        });
    } else {
        response = new Response(true, '', 1, []);
        logger.info(response);
        res.send(response);
    }
}

module.exports = getListByCondition;
