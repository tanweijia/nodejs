// 33333333333333333333333333333333333333333
//封装好的可以引用的吃连接
var mysql = require('mysql');
var pool  = mysql.createPool({
    connectionLimit : 10,
    user: 'root',
    host: 'localhost',
    password: '',
    port: '3306',//默认端口号，不需要修改
    database: 'nodejs'
  });
//实例版============================
// pool.getConnection(function(err, connection) {
//   if (err) throw err; // not connected!
//   // Use the connection
//   connection.query('select * from student', function (error, results, fields) {
//     console.log('The students2 is: ', results);
//     // When done with the connection, release it.
//     connection.release();
//     // Handle error after the release.
//     if (error) throw error;
//     // Don't use the connection here, it has been returned to the pool.
//   });
// });

//封装操作============================

//封装过度
// pool.getConnection(function(err, connection) {
//     if (err) throw err; // not connected!
//     // connection.query('select * from student where id=?',[1]//方法一
//     connection.query('select * from student where ? AND ?',[{//方法二
//         id:1
//     },{
//         name: 'lala'
//     }]
//     , function (error, results, fields) {
//       console.log('The students2 is: ', results);
//       connection.release();
//       if (error) throw error;
//     });
//   });

//封装后
function connect(sql,params){
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err, connection) {
            if (err) throw err; // not connected!
            // connection.query('select * from student where id=?',[1]//方法一
            connection.query(sql,params
            , function (error, results, fields) {
                // console.log('The students2 is: ', results);
                if (error) {
                    throw error;
                    reject(error);
                }else{
                    resolve(results);
                    connection.release();
                }
                
            });
        });
    });
    
}
module.exports={
    connect
}
