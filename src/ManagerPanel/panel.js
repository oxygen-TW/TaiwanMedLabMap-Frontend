function listCookies() {
    var theCookies = document.cookie.split(';');
    var cookies = {};
    for (var i = 1 ; i <= theCookies.length; i++) {
        var tmp = theCookies[i-1].split("=");
        cookies[tmp[0].replace(" ", "")] = tmp[1];
    }
    return cookies;
}

function setLabData(){
    const api = "https://medlab.oxygentw.net/api/fetch";

    const cookies = listCookies();

    const param = {
        name: cookies["labName"]
    };

    console.log(param);
    axios.post(api, param).then(res => {
        //console.log(res.data);
        let labData = res.data[0];

        document.getElementById("labPhone").value = labData["phone"];
        document.getElementById("labAddress").value = labData["address"];
        document.getElementById("labWebsite").value = labData["website"];
    }, function (error) {
        console.log("取得檢驗所資料失敗 " + error);
    }).catch(console.log);
}

function setLabName(){
    let cookies = listCookies();
    if(cookies["labName"] == undefined){
        alert("登入逾時，請重新登入");
        window.location.href = "login.html";
    }

    document.getElementById("labName").value = cookies["labName"];
    setLabData();
}

function updateLabInfo(){
    let labPhone = document.getElementById("labPhone");
    let labAddress = document.getElementById("labAddress");
    let labWebsite = document.getElementById("labWebsite");
    let labName = document.getElementById("labName");

    if(labAddress.value == "" || labPhone.value == "" || labName==""){
        alert("請輸入完整欄位");
        return;
    }

    const api = "https://medlab.oxygentw.net/api/modify";

    const cookies = listCookies();
    const config = {
        headers: { Authorization: `Bearer ${cookies["token"]}` }
    }
    const param = {
        name: labName.value,
        phone: labPhone.value,
        address: labAddress.value,
        website: labWebsite.value
    };

    console.log(param);
    axios.post(api, param, config).then(res => {
        console.log(res.data);
        alert("修改成功！");
    }, function (error) {
        alert("修改失敗 " + error);
    }).catch(console.log);
}