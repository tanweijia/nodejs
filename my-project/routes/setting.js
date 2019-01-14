var express = require('express');
var router = express.Router();
var multer = require("multer");
var {
    connect,
    insert,
    find,
    del,
    ObjectId,
    sort
} = require("../libs/mongo.js");
var token = require("../libs/token.js");
var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        // console.log(1)
        cb(null, './uploads')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        //给图片加上时间戳格式防止重名名
        //比如把 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
var upload = multer({
    storage: storage
});
router.post('/upload', upload.single('file_img'), function (req, res, next) {
    // console.log(req)
    res.json({
      status: "success",
      file: req.file
    });
});
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
//查询
router.post('/findUser', async (req, res, next) => {
    let {
        name
    } = req.body
    // console.log(req.body);
    let data = await find(`students`, name ? {
        name
    } : {})
    res.send(data);
});

//增加
router.post('/insertUser', async (req, res, next) => {
    let {
        inputName,
        inputAge,
        inputTel,
        inputSkill
    } = req.body
    
    let data = await insert("students", [{
        name: inputName,
        skill: inputSkill,
        tel: inputTel,
        age: inputAge
    }]);
    res.send(data);
});
//删除
router.post('/deltUser', async (req, res, next) => {

    let{
        inputName,
        inputTel,
        inputSkill,
        inputAge,
        // inputID
    }=req.body;
    let obj = {};
    // if(inputID!=''){obj._id = inputID};
    if(inputName!=''){obj.name = inputName};
    if(inputTel!=''){obj.tel = inputTel};
    if(inputSkill!=''){ob1.skill = inputSkill};
    if(inputAge!=''){obj.age = inputAge};
    let data = await del(`students`, obj);
    res.send(data);
});

//修改
router.post('/sorttUser', async (req, res, next) => {
    let {
        // inputID,
        inputName,
        inputTel,
        inputSkill,
        inputAge,
        inputName1,
        inputTel1,
        inputSkill1,
        inputAge1
    }=req.body;
    let obj1={};
    // if(inputID!=''){obj1._id = inputID};
    if(inputName!=''){obj1.name = inputName};
    if(inputTel!=''){obj1.tel = inputTel};
    if(inputSkill!=''){obj1.skill = inputSkill};
    if(inputAge!=''){obj1.age = inputAge};
    
    let obj2 = {};
    if(inputName1!=''){obj2.name = inputName1};
    if(inputTel1!=''){obj2.tel = inputTel1};
    if(inputSkill1!=''){obj2.skill = inputSkill1};
    if(inputAge1!=''){obj2.age = inputAge1};
    let data = await sort("students", obj1,obj2);
    res.send(data);
});

//登录路由
router.post('/login', async (req, res, next) => {
    // console.log(req.body);
    let {
      inputEmail,
      inputPassword
    } = req.body
    let data = await find("login", {
      name: inputEmail
    })
    // console.log(data)
    if (data[0].password === inputPassword) {
        res.send({
            status: "success",
            token: token.createToken({
              inputEmail,
              inputPassword
            },200)
        });
    } else {
        res.send({
            status: "fail"
        });
    }
});
router.post('/autoLogin', async (req, res, next) => {
    // console.log(req.headers)
    res.send({
      status: token.checkToken(req.headers.token)
    })
})

module.exports = router;