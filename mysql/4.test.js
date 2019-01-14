// 44444444444444444444444444444444444444
//实例测试文件
var db=require('./3.poolmin.js');
// console.log(db);

/*
// 方法一
db.connect('select * from student',null).then(function(data){
    console.log('全部信息：');
    console.log(data);
});//查询所有信息

db.connect('select * from student where ?',[{ id:1 }]).then(function(data1){
    console.log('单个信息：');
    console.log(data1);
});//单独查询
*/

// 方法二
(async function(){
    console.log('全部信息：');
    var data = await db.connect('select * from student',null);
    console.log(data);

    console.log('单个信息：');
    var data1 = await db.connect('select * from student where ?',[{ id:1 }]);
    console.log(data1);
})();