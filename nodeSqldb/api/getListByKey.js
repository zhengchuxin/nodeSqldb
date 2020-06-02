var logger = require('../logConfig');
var connection = require('../sqlConfig');
var Response = require('./response');

function getListByKey(req, res) {
    //打印请求报文
    logger.info(req.body);
    var param = req.body;
    var productName = param.productName;//与前端约定好，不管是商品名称还是商品描述都通过 productName 字段传过来。
    var response = new Response(false, '', -1,[]);
    if (productName) {
        connection.query("select * from t_product where p_name like '%"+productName
            +"%'"+" or p_des like '%"+ productName+"%'",function (error, results, fields) {
            if (error) throw error;
            var response = new Response(true, '查询成功', 1, results);
            logger.info(response);
            res.send(response);
        });
    } else {
        response = new Response(true, '', 1,[]);
        logger.info(response);
        res.send(response);
    }
}
module.exports = getListByKey;
