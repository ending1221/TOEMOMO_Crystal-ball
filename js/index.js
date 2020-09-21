// 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-071?locationName={locationName}&elementName={elementName}&sort={sort}&startTime={startTime}&timeFrom={timeFrom}&timeTo={timeTo}'

// 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-5C1EF3CE-EE15-4209-9FDF-B9E3DE17E5A8&locationName=新北'

// const code = 'CWB-5C1EF3CE-EE15-4209-9FDF-B9E3DE17E5A8';



fetch(
    'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-5C1EF3CE-EE15-4209-9FDF-B9E3DE17E5A8',
  )
    .then(response => response.json())
    .then(data => {
        console.log(data.records.locations[0].location[9]);
    })


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

fetch(
    'https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-5C1EF3CE-EE15-4209-9FDF-B9E3DE17E5A8&locationName=臺北',
    )
    .then(response => response.json())
    .then(r => {
        const data = r.records.location[0];
        const temp = r.records.location[0].weatherElement[3].elementValue;
        const resultTemp = decimalPoint(temp);
        let today = getToday(new Date().getDay());
        const time = data.time.obsTime.slice(11, 16);
        console.log('time',time);
        console.log(data);

        const $texts = $('.daybox').find('.text_area');
        console.log($texts);

        $texts.find('.temperature').html(resultTemp + '<span>°C</span>');
        $texts.find('.infos').html(data.parameter[0].parameterValue + data.parameter[2].parameterValue + '<br />' + today + ' ' + time)
    })
    