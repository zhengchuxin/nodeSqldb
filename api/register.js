var logger = require('../logConfig');
var connection = require('../sqlConfig');
var Response = require('./response');

function register(req, res) {
    //打印请求报文
    var param = req.body;
    var username = param.username;
    var password = param.password;
    var phone = param.phone;
    var response = new Response(false, '', -1);
    if (username && password && phone) {
        //1、查看数据库中是否有相同用户名
        connection.query("select * from t_user where username = ?", [username], function (error, results, fields) {
            if (error) throw error;
            if (results.length >= 1) {
                //2、如果有相同用户名，则注册失败，用户名重复
                response = new Response(false, '注册失败，用户名重复', -1);
                //打印响应报文
                logger.info(response);
                res.send(response);
            } else {
                connection.query("insert into t_user(username,password,phone) VALUES(?,?,?)", [username, password, phone], function (error, results, fields) {
                    if (error) throw error;
                    //3、如果没有相同用户名，并且有一条记录，则注册成功
                    if (results.affectedRows == 1) {
                        response = new Response(false, '注册成功', 1);
                        logger.info(response);
                        res.send(response);
                    } else {
                        response = new Response(false, '注册失败', -1);
                        logger.info(response);
                        res.send(response);
                    }
                });
            }
        })
    } else {
        response = new Response(false, '注册失败，用户名、密码、用户号不能为空', -1);
        logger.info(response);
        res.send(response);
    }
}
module.exports = register;
