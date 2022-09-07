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
}

function save(){
    let rapidTestStock = document.getElementById("rapidTestStock");
    let isRapidTest = document.getElementById("isRapidTest");

    console.log(isRapidTest.checked);
    if(isRapidTest.checked && rapidTestStock.value == ""){
        alert("請輸入快篩數量");
        return;
    }

    if(!Number.isInteger(Number(rapidTestStock.value))){
        alert("請輸入整數快篩數量");
        return;
    }

    if(isRapidTest.checked && (+rapidTestStock.value == NaN) || rapidTestStock.value < 0 ){
        alert("請輸入合法快篩數量");
        return;
    }
    const api = "https://medlab.oxygentw.net/api/modify";

    const cookies = listCookies();
    const config = {
        headers: { Authorization: `Bearer ${cookies["token"]}` }
    }

    const params = {
        name: cookies["labName"],
        rapidTest: isRapidTest.checked,
        rapidTestStock: isRapidTest.checked? parseInt(rapidTestStock.value) : 0
    };

    console.log(params);
    axios.post(api, params, config).then(resp => {
        console.log("Promise ok");
        console.log(resp.data);

        alert("修改成功！");
    }, function (error) {
        alert("修改失敗 " + error);
    }).catch(console.log);
}