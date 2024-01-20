export const getYear = () => { //run this method to get the year expected in createDateObject
    return new Date().getFullYear();
}

export const getNumericalDate = (timeArray: string[]) => { //takes in the split entry time value which is mapped into an array. We take the first 5 character of the first index value of that array and
    return timeArray[0].substring(5) //e.g. returns 08-13 on August 13
}

export const createDateObject = (numericalDate: string, currentYear: number) => { //expects a Numerical Date e.g. 08-12 and currentYear e.g. 2023.
    console.log("Numerical Date: " + currentYear)
    return new Date(currentYear + "-" + numericalDate)
}

export const getTimezone = (dateObj: Date) => { // expects a Date Object input e.g.: Wed Aug 16 2023 17:00:00 GMT-0700 (Pacific Daylight Time)
    //console.log(dateObj)
    return dateObj.getTimezoneOffset();
}

export const getDayOfWeek = (numericalDate: string) => { //getDayOfWeek expects a 5 character string e.g. 08-27 for August 27th and returns e.g. Wed for Wednesday
    //given the current date, calculate a day of the week
    let currentYear = getYear(); //first find the year          

    let dateObj = createDateObject(numericalDate, currentYear); //then create a Date Object that combines the year and the 5 character numerical date we took into this method
    //console.log(dateObj)
    let timezoneOffeset = getTimezone(dateObj) //figure out the timezone offset in the user's timezone

    dateObj.setMinutes(dateObj.getMinutes() + timezoneOffeset) //adjust the minutes in that Date object to account for that offset. 
    //Failure to do this will e.g.lead to data from PDT showing up as 17: 00 on the day before because 24 - 7(the offset at time of writing) = 17!
    let date = dateObj.toString(); //convert the date object to a string so that you can take a substring from it

    //console.log("Date is: " + dateObj + " Logged Date is: " + object.date + " Logged Time is: " + object.time)
    let dayOfWeek = date.substring(0, 3); //grab just the first 3 characters of the date string e.g. SUN, MON etc

    return dayOfWeek
}

