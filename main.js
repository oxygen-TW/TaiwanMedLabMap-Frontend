var userLocState = false;
var nearLab;
var nearLabId;
var filterValue = 0;

async function HTTPFetch() {
    //Filter = All
    if (filterValue == 0) {
        axios.get('https://medlab.oxygentw.net/api/fetchAll/').then(resp => {
            console.log("Promise ok");
            LabData = resp.data;
            console.log(LabData);
            getLocation(LabData);
        }, function (error) {
            console.log(error);
            alert("取得檢驗所資料失敗，嘗試重新整理頁面或聯絡開發人員");
        });
    }
    else {
        //rapidTest
        let params;
        if (filterValue == 1) {
            params = {
                rapidTest: true
            }
        }
        else {
            params = {
                "rapidTest": true,
                "rapidTestStock": { "$gt": 0 }
            }
        }
        axios.post('https://medlab.oxygentw.net/api/fetch', params).then(resp => {
            console.log("Promise ok");
            LabData = resp.data;
            console.log(LabData);
            getLocation(LabData);
        }, function (error) {
            console.log(error);
            alert("取得檢驗所資料失敗，嘗試重新整理頁面或聯絡開發人員");
        });
    }
}


async function fetchNearLab(_lng, _lat) {
    let payload = { lng: _lng, lat: _lat, limit: 3 };

    //RapidTest
    if (filterValue == 1) {
        payload["query"] = {
            rapidTest: true
        }
    }
    //RapidTest + Stock
    else if (filterValue == 2) {
        payload["query"] = {
            rapidTest: true,
            rapidTestStock: {
                "$gt": 0
            }
        }
    }

    let res;
    try {
        res = await axios.post('https://medlab.oxygentw.net/api/fetchNear', payload);
    } catch (error) {
        alert("取得鄰近檢驗所時發生錯誤");
        console.log(error);
    }

    nearLab = res.data;
    console.log(res.data);

    //判斷裝置
    if ($(window).width() < 992) {
        nearLabId = "#nearlab_card_mobile";
    } else {
        nearLabId = "#nearlab_card";
    }

    console.log(nearLab);
    var i = 0;
    if (nearLab != undefined) {
        $("#nearlab_card").empty();
        if (nearLab[i]["rapidTest"] == undefined) {
            nearLab[i]["rapidTest"] = false;
        }
        while (nearLab.length > (i)) {
            var comment = '<div class="ts-box"> \
                                <div class="ts-app-layout is-vertical"> \
                                    <div class="cell"> \
                                        <div class="ts-content"> \
                                            <div class="ts-text is-big">' + nearLab[i]["name"] + '</div> \
                                        </div> \
                                    </div> \
                                    <div class="cell is-fluid is-tertiary"> \
                                        <div class="ts-content"> \
                                            <p>地址：' + nearLab[i]["address"] + ' \
                                            <br> 電話：' + nearLab[i]["phone"] + ' \
                                            <br>是否提供快篩服務：' + nearLab[i]["rapidTest"] + ' \
                                            <br>快篩剩餘：' + nearLab[i]["rapidTestStock"] + '</p> \
                                            <button class="ts-button is-start-labeled-icon is-outlined is-small" onclick=googleMapNav("' + nearLab[i]["address"] + '")> \
                                                <span class="ts-icon is-car-icon"></span> \
                                                導航至此 \
                                            </button></div> \
                                        </div> \
                                    </div> \
                                </div> \
                            </div> \
                            <div class="ts-space"></div> \
                        ';
            //console.log(comment);
            $(nearLabId).append(comment);
            i++;
        }
    } else {
        alert("error");
    }
    return res.data;
}

function getLocation(LabData) {
    //HTTPFetch();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            userLoc = { lat: position.coords.latitude, lng: position.coords.longitude, };
            console.log(position.coords.latitude + position.coords.longitude);
            userLocState = true;

            //取得最近檢驗所
            fetchNearLab(userLoc["lng"], userLoc["lat"]);
            initMap(userLoc, LabData);
        },
            function (error) {
                if (error.code == error.PERMISSION_DENIED) {
                    alert("別拒絕我嘛~ 我能幫你找到你附近的檢驗所呦~");
                }
                var userLoc = { lat: 24.1369088, lng: 120.6550528 };
                initMap(userLoc, LabData);
            }, { enableHighAccuracy: true });
    } else {
        userLoc = { lat: 24.1369088, lng: 120.6550528 };
        initMap(userLoc, LabData);
    }
    console.log("INIT");
    window.initMap = initMap;
}

function filterChange(_radio) {
    filterValue = _radio.value;

    //Redraw map
    if (map != undefined) {
        map.remove();

        if ($(window).width() < 992) {
            $("#nearlab_card_mobile").empty();
        } else {
            $("#nearlab_card").empty();
        }

        HTTPFetch();
    }

}

function googleMapNav(address) {
    var navUrl = `https://www.google.com/maps/dir/${userLoc["lat"]},${userLoc["lng"]}/${address}`;
    window.open(navUrl, "Navigator")
}