// 1111111111111111111111111
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	port: '3306',//默认端口号，不需要修改
	database: 'nodejs'
});
connection.connect();//连接数据库
console.log('连接数据库');
connection.query('select * from student', function(err, rows, fields) {
	console.log('获取数据');
	if(err) throw err;
	console.log('The students is: ', rows);
});//由于用connection连接很慢，所以给用pool池连接的方法
//执行SQL语句,nodejs与PHP操作数据库最大的区别在这里，nodejs是异步，不用等这里执行完成就可以执行下面的代码
console.log('关闭数据库');
connection.end();//关闭连接。