var logger = require('../logConfig');
var connection = require('../sqlConfig');
var Response = require('./response');
function login(req, res) {
    //打印请求报文
    var param = req.body;
    var username = param.username;
    var password = param.password;
    var response = new Response(false, '', -1);
    if (username && password) {
        //1、查询数据库中是否有用户名
        connection.query("select * from t_user where username = ?", [username], function (error, results, fields) {
            if (error) throw error;
            if (results.length >= 1) {
                //2、如果有用户名，查询密码是否相同
                if (password == results[0].password) {
                    //3、密码相同则登陆成功
                    response = new Response(true, '登陆成功', 1);
                    logger.info(response);
                    res.send(response);
                } else {
                    response = new Response(true, '登陆失败，密码错误', -1);
                    logger.info(response);
                    res.send(response);
                }
            } else {
                response = new Response(false, '登陆失败，没有此用户名', -1);
                logger.info(response);
                res.send(response);
            }
        });
    } else {
        response = new Response(false, '登陆失败，用户名或密码不能为空', -1);
        //打印响应报文
        logger.info(response);
        res.send(response);
    }
}
module.exports = login;
