var logger = require('../logConfig');
var connection = require('../sqlConfig');
var Response = require('./response');

function deleteProduct(req, res) {
    //打印请求报文
    logger.info(req.body);
    var param = req.body;
    var pid = param.pid;
    var response = new Response(false, '', -1);
    if (pid) {
        //1、查看数据库中是否有相同用户名
        connection.query("delete from t_product where pid = " + pid, function (error, results, fields) {
            if (error) throw error;
            //3、如果没有相同用户名，并且有一条记录，则注册成功
            if (results.affectedRows == 1) {
                response = new Response(false, '删除成功', 1, null);
                logger.info(response);
                res.send(response);
            } else {
                response = new Response(false, '删除失败', -1, null);
                logger.info(response);
                res.send(response);
            }
        });
    } else {
        response = new Response(false, '删除失败，商品id为空', -1);
        logger.info(response);
        res.send(response);
    }
}

module.exports = deleteProduct;