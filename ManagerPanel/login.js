
function login(){
    var labName = document.getElementById("labName");
    var keyValue = document.getElementById("key");

    if(labName.value == "" || keyValue.value == ""){
        alert("請輸入完整帳號密碼");
        return;
    }

    let payload = { labName: labName.value, password: keyValue.value };

    axios.post('https://medlab.oxygentw.net/api/auth', payload).then(resp => {
        console.log("Promise ok");
        LabData = resp.data;
        console.log(LabData);

        document.cookie = "labName=" + labName.value;
        document.cookie = "token=" + LabData["access_token"];

        alert("登入成功！");
        window.location.href = "index.html";
    }, function (error) {
        console.log(error);
        if(error.response.status == 401){
            alert("登入失敗，，帳號或密碼錯誤。");
        }
        else{
            alert("伺服器請求失敗，嘗試重新整理頁面或聯絡開發人員");
        }
        
    });
}