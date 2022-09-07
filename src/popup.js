var nearBtn = document.getElementById("nearby");
nearBtn.addEventListener("click", function(){
    document.getElementById("nearView").className = 'ts-modal is-visible';
    document.getElementById("map-mobile").style.visibility = "hidden";
}, false)

var nearExit = document.getElementById("nearExit");
nearExit.addEventListener("click", function(){
    document.getElementById("nearView").className = 'ts-modal';
    document.getElementById("map-mobile").style.visibility = "visible";
})

var loginBtn = document.getElementById("filter");
loginBtn.addEventListener("click", function(){
    document.getElementById("filterView").className = 'ts-modal is-visible';
    document.getElementById("map-mobile").style.visibility = "hidden";
})

var filterExit = document.getElementById("filterExit");
filterExit.addEventListener("click", function(){
    document.getElementById("filterView").className = 'ts-modal';
    document.getElementById("map-mobile").style.visibility = "visible";
})

// var loginSend = document.getElementById("loginSend");
// loginSend.addEventListener("click", function(){
//     document.getElementById("loginView").className = 'ts-modal';
//     document.getElementById("map-mobile").style.visibility = "visible";
// })