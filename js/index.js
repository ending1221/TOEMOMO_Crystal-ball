const sun = `
    <svg viewbox="-50 -50 100 100">
        <circle class="sun" cx="0" cy="0" r="23"></circle>
    </svg>`;

const sunCloud = `
    <svg viewbox="-55 -40 100 100">
        <circle class="sun" cx="0" cy="0" r="20"></circle>
        <g class="cloud">
            <circle cx="0" cy="25" r="20"></circle>
            <circle cx="-15" cy="25" r="20"></circle>
            <circle cx="-30" cy="25" r="20"></circle>
            <circle cx="-30" cy="10" r="15"></circle>
            <circle cx="-10" cy="12" r="15"></circle>
        </g>
    </svg>`;

const cloud = `
    <svg viewbox="-63 -28 100 100">
        <g class="cloud">
            <circle cx="0" cy="25" r="20"></circle>
            <circle cx="-15" cy="25" r="20"></circle>
            <circle cx="-30" cy="25" r="20"></circle>
            <circle cx="-30" cy="10" r="15"></circle>
            <circle cx="-10" cy="12" r="15"></circle>
        </g>
    </svg>`;

const rain_Big = `
    <div class="cloud topcloud">
        <div class="rain"></div>
        <div class="rain rain2"></div>
        <div class="rain rain3"></div>
    </div>`;

const rain_small = `
    <svg viewbox="-63 -28 100 100">
        <line class="rain" x1="-25" y1="15" x2="-25" y2="35"></line>
        <line class="rain rain2" x1="-14" y1="5" x2="-14" y2="25"></line>
        <line class="rain rain3" x1="-5" y1="20" x2="-5" y2="45"></line>
        <g class="cloud">
            <circle cx="0" cy="25" r="20"></circle>
            <circle cx="-15" cy="25" r="20"></circle>
            <circle cx="-30" cy="25" r="20"></circle>
            <circle cx="-30" cy="10" r="15"></circle>
            <circle cx="-10" cy="12" r="15"></circle>
        </g>
    </svg>`;

const wind = `
    <svg viewbox="-25 -50 150 140">
        <path class="wind" d="M0 0 h35"></path>
        <path class="wind" d="M35 0 Q55 -5 45 -20"></path>
        <path class="wind" d="M45 -20 Q30 -30 30 -10"></path>
        <path class="wind" d="M0 20 h80"></path>
        <path class="wind" d="M80 20 Q110 10 105 -10"></path>
        <path class="wind" d="M105 -10 Q80 -40 70 0"></path>
        <path class="wind" d="M0 40 h60"></path><path class="wind" d="M60 40 Q90 40 75 65"></path>
        <path class="wind" d="M75 65 Q60 70 55 60"></path>
    </svg>`

const weatherArray = ['多雲時晴', '晴天', '晴時多雲', '多雲', '陰天', '雨天']
const $texts = $('.daybox').find('.text_area');

// 載入當日全台氣候資料
fetch(
    'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-5C1EF3CE-EE15-4209-9FDF-B9E3DE17E5A8',
  )
    .then(response => response.json())
    .then(data => {
        const weathers = data.records.locations[0].location[9].weatherElement[6].time;
        if (weathers === undefined) {
            console.log('api載入失敗');
            alert('資料載入失敗，請重新整理頁面! :(')
        }
        showWeekWeather(weathers);

        const nowWeather = weathers[0].elementValue
        let weatherNum = checkWeatherNum(nowWeather[1].value);
        $('.crystalBall .todayWeather').html(getWeather(weatherNum))
        $texts.find('.todayWeather_text').text(nowWeather[0].value);
    })

// state = 是否為 weekWeather
function getWeather(weather, state=true) {
    if (weather === 1 || weather === 24) return sun;
    if (weather === 2 || weather === 3 || weather === 25 || weather === 26) return sunCloud;
    if ((weather >= 4 && weather <= 7) || (weather >= 26 && weather <= 28)) return cloud;
    if ((weather >= 8 && weather <= 22) || (weather >= 29 && weather <= 41)) {
        if(state) {
            return rain_small;
        }
        return rain_Big;
    }
}

function checkWeatherNum(num) {
    let weatherNum = num;
    if (weatherNum[0] === '0') weatherNum = weatherNum[1];
    return parseInt(weatherNum);
}

function showWeekWeather(weekData) {
    let html = ''
    let j = 0;
    for (let i = 0; i < 7; i++) {
        let num = checkWeatherNum(weekData[j].elementValue[1].value)
        let day = weekData[j].startTime.slice(6,10).replace('-', '/');
        html += `
        <div class="dayweather">
            <h3>${day}</h3>
            ${getWeather(num)}
        </div>`
        j += 2;
    }
    $('.bottom').html(html);
}


function getToday(day) {
    let today = '';
    switch (day) {
        case 0:
            today = '星期日';
            break;
        case 1:
            today = '星期一';
            break;
        case 2:
            today = '星期二';
            break;
        case 3:
            today = '星期三';
            break;
        case 4:
            today = '星期四';
            break;
        case 5:
            today = '星期五';
            break;
        case 6:
            today = '星期六';
            break;
    }
    return today
}

function decimalPoint(num) {
    return num.substring(0, num.indexOf('.')+2);
}

// 載入台北市當下氣候資料
fetch(
    'https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-5C1EF3CE-EE15-4209-9FDF-B9E3DE17E5A8&locationName=臺北',
    )
    .then(response => response.json())
    .then(r => {
        const data = r.records.location[0];
        const today = getToday(new Date().getDay());
        const time = data.time.obsTime.slice(11, 16); // 只取出時間
        let temp = data.weatherElement[3].elementValue;
        temp = temp.length === 5 ? decimalPoint(temp) : temp;

        $texts.find('.temperature').html(temp + '<span>°C</span>');
        $texts.find('.infos').html(data.parameter[0].parameterValue + data.parameter[2].parameterValue + '<br />' + today + ' ' + time);
    })
    

    