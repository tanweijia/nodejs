
// 请求封装好的方法,不能去掉的请求
let {
    connect,
    find,
    insert,
    del,
    update
} = require('./5.lib/1.pool.js');
// find('SELECT * FROM student',null).then(data => console.log(data));//为改进前
// 改进一

//1.查询命令是执行的语句
// (async ()=>{
//     //查询单个
//     // let data = await find(`student`,{
//     //     id:1
//     // });
//     //查询所有
//     let data = await find(`student`,null);
//     console.log(data);
// })();

// //2.插入命令是执行的语句
// (async ()=>{
//     await insert(`student`,{
//         name: 'jiayou',
//         skill: 'html',
//         age: 19
//     });
//     await console.log('添加成功');
// })();

//3.删除命令是执行的语句
// (async ()=>{
//     await del(`student`,{
//         id: 20
//     });
//     await console.log('删除成功');
// })();

//4.修改命令是执行的语句
(async ()=>{
    await update(`student`,{
        //修改后的内容，可以是多个
        // name: 'lala'//单个修改
        //多个信息修改
        skill:'nodejs',
        age:13
    },{
        name: 'lala'//要修改内容的标志信息
    })
    await console.log('修改成功');
})();