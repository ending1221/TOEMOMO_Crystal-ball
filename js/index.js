// 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-071?locationName={locationName}&elementName={elementName}&sort={sort}&startTime={startTime}&timeFrom={timeFrom}&timeTo={timeTo}'

// 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-5C1EF3CE-EE15-4209-9FDF-B9E3DE17E5A8&locationName=新北'

// const code = 'CWB-5C1EF3CE-EE15-4209-9FDF-B9E3DE17E5A8';



fetch(
    'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-5C1EF3CE-EE15-4209-9FDF-B9E3DE17E5A8',
  )
    .then(response => response.json())
    .then(data => {
        console.log(data.records.locations[0].location[15]);
    })

    