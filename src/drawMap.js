let map;

function initMap(userLoc, LabData) {

    console.log(userLoc);

    //載入紅色icon
    var redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    //判斷RWD
    if ($(window).width() < 993) {
        map = L.map('map-mobile', {
            center: L.latLng(userLoc["lat"], userLoc["lng"]),
            zoom: 15
        });
        console.log("mobile");
    } else {
        map = L.map('map', {
            center: L.latLng(userLoc["lat"], userLoc["lng"]),
            zoom: 15
        });
        console.log("std");
    }

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '<a href="https://www.openstreetmap.org/">OSM</a>',
        maxZoom: 18,
    }).addTo(map);

    var i;
    for (i = 0; i < LabData.length; i++) {
        //跳過不顯示的
        // if (!LabData[i]["visible"]) {
        //     continue;
        // }

        var marker = L.marker([LabData[i]["location"]["coordinates"][1], LabData[i]["location"]["coordinates"][0]], { icon: redIcon });
        marker.addTo(map);

        if (LabData[i]["rapidTest"] == undefined) {
            LabData[i]["rapidTest"] = false;
        }
        if (LabData[i]["rapidTestStock"] == undefined) {
            LabData[i]["rapidTestStock"] = false;
        }

        infowindowContent = `<h3>${LabData[i]["name"]}</h3>
                地址：${LabData[i]["address"]}<br/>
                電話：${LabData[i]["phone"]}<br/>
                是否提供快篩服務： ${LabData[i]["rapidTest"] ? "是" : "否"}<br/>
                快篩剩餘： ${LabData[i]["rapidTestStock"] ? LabData[i]["rapidTestStock"] : "0"}<br/>
                最後更新：${LabData[i]["lastUpdate"]}`;

        marker.bindPopup(infowindowContent).openPopup();
    }

    if (userLocState) {
        var marker = L.marker([userLoc["lat"], userLoc["lng"]]);
        marker.addTo(map);
        marker.bindPopup("<p>現在位置</p>").openPopup();
    }

    map.panTo(new L.LatLng(userLoc["lat"], userLoc["lng"]));
}

