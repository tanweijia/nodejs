$(() => {

    // 加载成功后进行一次数据查询
    let getUserList = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://47.94.8.86:3000/setting/findUser",
                success(data) {
                    resolve(data)
                }
            })
        })
    }
    
    let autoLogin = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                headers: {
                    token: localStorage.getItem("token")
                },
                url: "http://47.94.8.86:3000/setting/autoLogin",
                success(data) {
                    resolve(data)
                }
            })
        })
    }
    (async () => {
        let isLogin = await autoLogin();
        // 异步 awiat和async
        // console.log(isLogin);
        isLogin.status;
    })();
    //增加函数封装
    let inserts = (inputName, inputTel, inputSkill, inputAge) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://47.94.8.86:3000/setting/insertUser",
                data: {
                    inputName,
                    inputAge,
                    inputTel,
                    inputSkill
                },
                success(data) {
                    resolve(data)
                }
            })
        })
    }

    //删除函数封装
    let dels = (inputName, inputTel, inputSkill, inputAge) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://47.94.8.86:3000/setting/deltUser",
                data: {
                    inputName,
                    inputTel,
                    inputSkill,
                    inputAge
                },
                success(data) {
                    resolve(data)
                }
            })
        });
    }

    //修改函数封装
    let sorts = (inputName,inputTel,inputSkill,inputAge,inputName1,inputTel1,inputSkill1,inputAge1) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://47.94.8.86:3000/setting/sorttUser",
                data: {
                    // inputID,
                    inputName,
                    inputTel,
                    inputSkill,
                    inputAge,
                    inputName1,
                    inputTel1,
                    inputSkill1,
                    inputAge1
                },
                success(data) {
                    resolve(data)
                }
            })
        });
    }

    function create(){
        (async ()=>{
            let data = await getUserList();
            // console.log(data);
            let html = data.map((item,index)=>{
                return `
                    <tr>
                        <td>${item._id}</td>
                        <td>${item.name}</td>
                        <td>${item.age}</td>
                        <td>${item.tel}</td>
                        <td>${item.skill}</td>
                    </tr>            
                `
            }).join("");
            $("#list").html(html);
            // console.log($('.config'));
        })();
    }
    create();

    //添加数据
    $('#add').click(()=>{
        let inputName = $('#addname').val().trim();
        //inputAge、inputTel、inputSkill有点小bug，排序会乱
        let inputAge = $('#addtel').val().trim();
        let inputTel = $('#addskill').val().trim();
        let inputSkill = $('#addage').val().trim();
        if(inputName,inputAge,inputTel,inputSkill){
            inserts(inputName,inputAge,inputTel,inputSkill);
            
        }else {
            alert('数据不能为空');
        }
        create();
    });

    //删除
    $('#del').click(async ()=>{
        let inputName = $('#delname').val().trim();
        let inputTel = $('#deltel').val().trim();
        let inputSkill = $('#delskill').val().trim();
        let inputAge = $('#delage').val().trim();
        if (inputName == '' && inputTel == '' && inputSkill == '' && inputAge == '') {
            alert('至少输入一个条件')
        } else {
            let data = await dels(inputName, inputTel, inputSkill, inputAge);
            if (data.n != 0) {
                alert('删除成功');
            } else {
                alert('没有符合该条件的数据');
            }
        }
        create();  
        // dels(inputName, inputTel, inputSkill, inputAge);
    });

    $('#sort').click(async ()=>{
        // let inputID = $('#inputID').val();
        let inputName = $('#agoname').val();
        let inputTel = $('#agotel').val();
        let inputSkill = $('#agoskill').val();
        let inputAge = $('#agoage').val();
        let inputName1 = $('#newname').val();
        let inputTel1 = $('#newtel').val();
        let inputSkill1 = $('#newskill').val();
        let inputAge1 = $('#newage').val();
        // console.log(inputSkill);
        if(inputName==''&&inputTel==''&&inputSkill==''&&inputAge==''){
            alert('至少输入一个条件')
        }else{
            let data = await sorts(inputName, inputTel, inputSkill, inputAge, inputName1, inputTel1, inputSkill1, inputAge1);
            // console.log(data.n);
            if(data.n!=0){
                alert('修改成功'); 
            }else{
                alert('修改失败');  
            }
        }
        create();
    });

})