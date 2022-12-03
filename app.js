const inputTag = document.querySelector('#input-el');
const checkBtn = document.querySelector('#check-palindrome');
const outputTag = document.querySelector('#output');
const outputTagSecond = document.querySelector('#output2');

function clickHandler(){
    const bdayStr = inputTag.value;
    if(bdayStr !== ""){
        var listOfDate = bdayStr.split("-");

        var date = {
            "day" : Number(listOfDate[2]),
            "month" : Number(listOfDate[1]),
            "year" : Number(listOfDate[0])
        }
        const isPalindrome = checkPalindrome(date);
        if(isPalindrome){
            outputTag.innerText = "Yay your birthday is a palindrome🥳";
        }
        else{
            var [ctr,nextDate] = getNextPalindrome(date);
            outputTag.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr} days😞`
        }
    }
}

checkBtn.addEventListener('click',clickHandler)

function reversedStr(str){
    const splitList = str.split("");
    const reverseList = splitList.reverse();
    return reverseList.join('');
}

function isPalindrome(str){
    const reverse = reversedStr(str);
    return str === reverse ;
}

function convertDatetoStr(date){
    const dateStr = {day:"",month:"",year:""};

    if(date.day < 10){
        dateStr.day = '0' + date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }
    if(date.month < 10){
        dateStr.month = '0' + date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

function allDateFormats(date){
    const dateStr = convertDatetoStr(date);
    const ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    const mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    const yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    const ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    const mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    const yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}

function checkPalindrome(date){
    const listOfFormats = allDateFormats(date);
    let flag = false;
    for(let i=0;i<listOfFormats.length;i++){
        if(isPalindrome(listOfFormats[i])){
            flag  = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}

function getNextDate(date){
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    var daysInMonths = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month === 2){
        if(isLeapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
        }
        else{
            if(day > 28){
                day = 1;
                month++;
            }
        }
    }
    else{
        if(day > daysInMonths[month-1]){
            day = 1;
            month++;
        }
    }
    if(month > 12){
        month = 1;
        year++;
    }
    return {
        'day' : day,
        'month' : month,
        'year' : year
    };
}

function getNextPalindrome(date){
    let counter = 0;
    let nextDate = getNextDate(date);

    while(1){
        counter++;
        let palindrome = checkPalindrome(nextDate);
        if(palindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [counter,nextDate];
}

function getPreviousDate(date){
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;

    var daysInMonths = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month === 3){
        if(isLeapYear(year)){
            if(day === 0){
                day = 29;
                month--;
            }
        }
        else{
            if(day === 0){
                day = 28;
                month--;
            }
        }
    }
    if(day === 0){
        day = daysInMonths[month - 2];
        month--;
    }
    if(month === 0 && day === 0){
        day = 31;
        month = 12;
        year--;
    }
    return {
        'day' : day,
        'month' : month,
        'year' : year
    }
}

function getPreviousPalindrome(date){
    let counter = 0;
    let prevDate = getPreviousDate(date);

    while(1){
        counter++;
        let palindrome = checkPalindrome(prevDate);
        if(palindrome){
            break;
        }
        prevDate = getPreviousDate(prevDate);
    }
    return [counter,prevDate];
}
// var date = {
//     'day' : 12,
//     'month': 3,
//     'year': 2021
// };
// console.log(getPreviousPalindrome(date));