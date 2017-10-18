var makeDateArray = function(date1, date2){
    dateArray = [];

    function getDiff(d1, d2){
        return (d2 - d1) / 86400000;
    }

    function addDays(date, n){
        return new Date(date.getTime()+86400000)
    }

    for (i = 0; i < getDiff(date1, date2); i++){
        dateArray.push(addDays(date1, i));
    }

    return dateArray;
}

module.exports = makeDateArray;