
var mysql = require('mysql');
var config= require('./2.config.json');
// console.log(config);
var pool  = mysql.createPool({
  connectionLimit : 10,
  host: config.host,
  user: config.user,
  password: config.password,
  port: config.port,//默认端口号，不需要修改
  database: config.database
});
//  111111111111111
// pool.query('select * from student', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The students is: ', results);
// });
// pool.getConnection(function(err, connection) {
//   if (err) throw err; // not connected!
//   // Use the connection
//   connection.query('select * from student', function (error, results, fields) {
//     console.log('The students is: ', results);
//     // When done with the connection, release it.
//     connection.release();
//     // Handle error after the release.
//     if (error) throw error;
//     // Don't use the connection here, it has been returned to the pool.
//   });
// });

let connect= ()=>{
  return new Promise((resolve,reject)=>{
    pool.getConnection((err, connection)=> {
      !err ? resolve(connection) : reject(err)
    });
  });
}

//查询方法的封装
let find = (table,params)=>{
  return new Promise(async (resolve,reject) =>{
    let connection=await connect();//引用数据库
    //执行sql查询语句
    connection.query(`SELECT * FROM ${table} ${params ? 'where ?':''}`,[{
      ...params//结构，数组里面的内容结构出来
    }],(error,results,fields) => {
      !error ? resolve(results) : reject(error)
      connection.release();
    });
  });
}

//添加方法的封装
let insert = (table,params)=>{
  return new Promise(async (resolve,reject)=>{
    let connection = await connect();//引用数据库
    //执行sql插入语句
    connection.query(`INSERT INTO ${table} SET ?`,[{
      ...params//解构，数组里面的内容解构出来
    }],(error,results,fields)=>{
      !error ? resolve(results):reject(error);
      connection.release();
    });
  });
}


// ===要增加一个新的方法只需要改变方法名字，还有sql的执行语句========================================
//删除方法的封装
let del = (table,params)=>{
  return new Promise(async (resolve,reject)=>{
    let connection = await connect();//引用数据库
    //执行sql删除语句 
    connection.query(`DELETE FROM ${table} WHERE ?`,[{
      ...params//解构，数组里面的内容解构出来
    }],(error,results,fields)=>{
      !error ? resolve(results):reject(error);
      connection.release();
    });
  });
}

//修改方法的封装
let update = (table,params1,params2)=>{
  return new Promise(async (resolve,reject)=>{
    let connection = await connect();//引用数据库
    //执行sql删除语句 
    connection.query(`UPDATE ${table} SET ? WHERE ?`,[{
      ...params1//修改后的内容
    },{
      ...params2//要修改的内容
    }],(error,results,fields)=>{
      !error ? resolve(results):reject(error);
      connection.release();
    });
  });
}
module.exports = {
  connect,
  find,
  insert,
  del,
  update
}
