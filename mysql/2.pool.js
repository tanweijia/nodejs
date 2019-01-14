// 2222222222222222222222222222222222222
var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host: 'localhost',
  user: 'root',
  password: '',
  port: '3306',//默认端口号，不需要修改
  database: 'nodejs'
});
 
pool.query('select * from student', function (error, results, fields) {
  if (error) throw error;
  console.log('The students is: ', results);
});
pool.query('select * from student', function (error, results, fields) {
    if (error) throw error;
    console.log('The students is: ', results);
  });