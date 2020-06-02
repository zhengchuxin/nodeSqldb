var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


var register = require('./api/register'); // 注册
var login = require('./api/login'); // 登录
var addProduct = require('./api/addProduct'); // 增加商品
var getProductList = require('./api/getProductList'); // 商品列表
var getListByKey = require('./api/getListByKey'); // 模糊查询
var getListByCondition = require('./api/getListByCondition'); // 条件查询
var updateProduct = require('./api/updateProduct');// 更新商品
var deleteProduct = require('./api/deleteProduct'); // 删除商品

app.post('/register', (req, res) => register(req, res));
app.post('/login', (req, res) => login(req, res));
app.post('/addProduct', (req, res) => addProduct(req, res));
app.post('/getProductList', (req, res) => getProductList(req, res));
app.post('/getListByKey', (req, res) => getListByKey(req, res));
app.post('/getListByCondition', (req, res) => getListByCondition(req, res));
app.post('/updateProduct', (req, res) => updateProduct(req, res));
app.post('/deleteProduct', (req, res) => deleteProduct(req, res));


// 我们可以uncaughtException来全局捕获未捕获的Error，同时你还可以将此函数的调用栈打印出来，捕获之后可以有效防止node进程退出
process.on('uncaughtException', function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack);
});

// connection.end();
app.listen(3000, function () {    ////监听3000端口
    console.log('Server running  main.js  at 3000 port');
});








