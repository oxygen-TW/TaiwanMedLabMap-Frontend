function listCookies() {
    var theCookies = document.cookie.split(';');
    var cookies = {};
    for (var i = 1 ; i <= theCookies.length; i++) {
        var tmp = theCookies[i-1].split("=");
        cookies[tmp[0].replace(" ", "")] = tmp[1];
    }

    return cookies;
}

function checkToken(){
    let cookies = listCookies();

    if(cookies["token"] == undefined){
        alert("登入逾時，請重新登入");
        document.location = "login.html";
    }
    document.getElementById("labName").value = cookies["labName"];
}

function save() {
    const cookies = listCookies();
    let newPwd = document.getElementById("newPassword");
    let newPwdRepeat = document.getElementById("newPasswordRepeat");
    let labName = document.getElementById("labName");


    if (labName.value == "" || newPwd.value == "" || newPwdRepeat.value == "") {
        alert("請完整填寫欄位");
        return;
    }

    if (newPwd.value != newPwdRepeat.value) {
        alert("密碼不一致");
        newPwd.value = "";
        newPwdRepeat.value = "";
        return;
    }

    const api = "https://medlab.oxygentw.net/api/updatePwd";

    const config = {
        headers: { Authorization: `Bearer ${cookies["token"]}` }
    }

    const params = {
        labName: cookies["labName"],
        password: newPwd.value
    };

    console.log(params);
    axios.post(api, params, config).then(resp => {
        console.log("Promise ok");
        console.log(resp.data);

        alert("密碼修改成功！");
    }, function (error) {
        if(error.response.status == 401){
            alert("登入逾時，請重新登入");
            window.location = "login/";
            return false;
        }
        alert("伺服器請求失敗，嘗試重新整理頁面或聯絡開發人員。");
    }).catch(console.log);
}