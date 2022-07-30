function IsValidDateFormat(date) {
    //format dd/mm/yyyy
    return typeof date === "string" && date.match(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/);
}

function IsValidTimeFormat(time) {
    //format hh[h|H|:]mm
    return typeof time === "string" && time.match(/^([0-1][0-9]|2[0-3])[hH:]([0-5][0-9])$/);
}

function BuildDateTimeObjectFromValidFormat(formattedDate, formattedTime) {
    let arrDate = formattedDate.split('/');
    let day = parseInt(arrDate[0]);
    let month = parseInt(arrDate[1]) - 1;
    let year = parseInt(arrDate[2]);

    let arrTime = formattedTime.split('h');
    let hour = parseInt(arrTime[0]);
    let minute = parseInt(arrTime[1]);

    return new Date(year, month, day, hour, minute);
}

module.exports = {
    IsValidDateFormat,
    IsValidTimeFormat,
    BuildDateTimeObjectFromValidFormat,
};