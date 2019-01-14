$(() => {
    let signIn = $("#signIn");
    let login = (inputEmail, inputPassword) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://47.94.8.86:3000/setting/login",
                data: {
                    inputEmail,
                    inputPassword
                },
                success(data) {
                    resolve(data)
                }
            })
        })
    }
    signIn.click(async () => {
        let inputEmail = $("#inputEmail").val();
        let inputPassword = $("#inputPassword").val();
        let data = await login(inputEmail, inputPassword);
        // if (data === 'success') {
        //     console.log('登录成功');
        //     location.href = "dashboard.html"
            
        // } else {
        //     alert('登录失败');
        // }
        let fn = {
            success() {
                console.log('登录成功');
                localStorage.setItem("token", data.token);
                location.href = "dashboard.html"
            },
            fail() {
                alert('登陆失败');
            }
        }
        fn[data.status]();
    });
});