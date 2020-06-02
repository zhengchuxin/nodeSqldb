var express = require('express');
var mysql = require('mysql');
var app = express();

var log4js = require('log4js');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
//配置日志项
log4js.configure({
    appenders: {
        cheese: {
            type: 'file',
            filename: 'cheese.log',
            coloured: 'red'
        }
    },
    categories: {
        default: {
            appenders: [
                'cheese'
            ],
            level: 'error'
        }
    }
});
var logger = log4js.getLogger('cheese');
//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By", ' 3.2.1');
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// 连接数据库
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'nodeTest'
});


connection.connect();

//写个接口123
app.get('/getUrl', function (req, res) {

    var sql = 'SELECT * FROM student_message';
    var str = " ";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR]:', err.message);
        }
        console.log(str);  //数据库查询结果返回到result中
        res.send(JSON.stringify(result));  ////服务器响应请求
    });
});

app.get('/getAllData', (req, res) => {
    const sqlStr = 'SELECT * FROM student_info';
    connection.query(sqlStr, function (err, result) {

        if (err) {
            console.log('[SELECT ERROR]:', err.message);
        }
        res.json(result);
    })
});

// 查看
app.get('/getHero', (req, res) => {
    const id = req.query.id
    const sqlStr = 'select * from student_message where runoob_title = ?'
    connection.query(sqlStr, id, (err, results) => {
        if (err) return res.json({ err_code: 1, message: '获取数据失败', affectedRows: 0 })
        if (results.length !== 1) return res.json({ err_code: 1, message: '数据不存在', affectedRows: 0 })
        res.json({
            err_code: 0,
            message: results[0],
            affectedRows: 0
        })
    })
});

// 删除数据
app.get('/delHero', (req, res) => {
    const id = req.query.id
    const sqlStr = 'update student_message set isdel = 1 where runoob_title=?'
    connection.query(sqlStr, id, (err, results) => {
        if (err) return res.json({ err_code: 1, message: '删除英雄失败', affectedRows: 0 })
        if (results.affectedRows !== 1) return res.json({ err_code: 1, message: '删除英雄失败', affectedRows: 0 })
        res.json({ err_code: 0, message: '删除英雄成功', affectedRows: results.affectedRows })
    })
})

// 添加数据
app.post('/addHero', (req, res) => {
    const hero = req.body
    const sqlStr = 'insert into student_message set?'
    connection.query(sqlStr, hero, (err, results) => {
        if (err) return res.json({ err_code: 1, message: '添加失败', affectedRows: 0 })
        if (results.affectedRows !== 1) return res.json({ err_code: 1, message: '添加失败', affectedRows: 0 })
        res.json({ err_code: 0, message: '添加成功', affectedRows: results.affectedRows })
    })
})


// 修改数据
app.post('/updateHero', (req, res) => {
    const sqlStr = 'update student_message set ? where runoob_title=?'
    console.log('哈哈哈哈哈xxxx  +' + req.body.runoob_title);
    connection.query(sqlStr, [req.body, req.body.runoob_title], (err, results) => {

        logger.debug(results);
        if (err) return res.json({ err_code: 1, message: '更新英雄失败', affevtedRows: 0 })
        //影响行数不等于1
        if (results.affectedRows !== 1) return res.json({ err_code: 1, message: '更新的英雄不存在', affectedRows: 0 })
        res.json({ err_code: 0, message: '更新成功', affectedRows: results.affectedRows })
    })
})

// connection.end();
app.listen(3000, function () {    ////监听3000端口
    console.log('Server running at 3000 port');
});


//配置服务端口
// var server = app.listen(9090, function () {
//     var host = "192.168.1.77";  //server.address().address;
//     var port = "9090"; //server.address().port;
//     console.log('Example app listening at http://%s:%s', host, port);
// })
