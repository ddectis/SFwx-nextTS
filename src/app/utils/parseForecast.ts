import { RawWeatherPeriod, ParsedWeatherPeriod, WeatherChartData, DailySummaryDetail, DailySummary, WeatherSummary } from "../types/types";
import { Dispatch, SetStateAction } from "react";
import { getYear, getDayOfWeek, getNumericalDate, getTimezone, createDateObject } from "./dateUtils";

const parseForecast = (
  rawData: RawWeatherPeriod[],
  useCacheForecast: boolean,
  setChartData: Dispatch<SetStateAction<WeatherChartData | null>>,
  setWeatherSummary: Dispatch<SetStateAction<WeatherSummary | null>>
): ParsedWeatherPeriod[] => {

  let countOfBlueHours: number = 0            //keep track of how many of the forecast hours are "blue" i.e. good conditions
  let streakOfBlueHours: number = 0;          //every consecutive blue hour adds 1 to the streak, a nonblue hour sets it back to 0
  let longestBlueHourStreak: number = 0;      //store the longest streak here
  let dayWithLongestBlueStreak: string = ``;  //store the day with the longest streak here
  let totalHours: number = 0;                 //keep track of the sum of blue hours in the whole week
  let currentDayBeingTabulated: string = ``;  //use this value as the periods.forEach loop goes through each period. Check to see when it changes and then tabulate how many blue hours each day has
  let lastDayTabulated: string = ``;          //when currentDay is not = lastDay, we know that the day has changed
  let lastDayEntryTime: string = ``;
  let periodIndex: number = 0;
  let dayIndex: number = 0;                   //this value increases by 1 every time we detect that the parser has advanced to the next day
  let dailyBlueHours: number = 0;
  let dailySummary: DailySummary = { //when using object types, it's important to initialize the object with all the keys and placeholder values in place. Otherwise you'll get a type error
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0
  }                //this object will store the count of blue hours in each day. Used to create a daily summary graph
  let dailySummaryDetail: DailySummaryDetail[] = [];         //this object will store the list of blue hours for each day in an object to feed to the charts.js bubble chart
  let dewPointPeriods: string[] = [];           //this array will log time periods to match up with the dewpoints because the charts.js line graph seems to need an array for the labels and another array for the data
  let dewPointData: number[] = [];              //this array will store the dew point for each period
  let tempData: number[] = [];                  //this array will store the temperature values to put on the dew point graph
  let deltaData: number[] = [];                 //this array will store the delta between temperature and dewpoint
  let weatherObjects: ParsedWeatherPeriod[] = []


  rawData.forEach(period => {         //iterate over each period
    if (period.dewpoint !== null) { //check to ensure that the dewpoint value is not null. ONly try to create an add an object when it is not null
        let f = period.dewpoint.value * 9 / 5 + 32; //convert the C value we will receive into an F value
        let entryTime = period.startTime.split("T"); //split period.startTime into an array that splits at T
        //console.log(entryTime)
        //check which day the current period belongs to
        currentDayBeingTabulated = getDayOfWeek(getNumericalDate(entryTime))
        //check to see if the day has changed since the last period
        if (currentDayBeingTabulated !== lastDayTabulated && periodIndex !== 0) {
            const newDailyBlueHourCount = {         //if so, then log the count of blue hours from the previous day to a new object
                [lastDayTabulated]: dailyBlueHours
            }
            dailySummary = { ...dailySummary, ...newDailyBlueHourCount }    //and spread it into the dailySummary object
            if (dailyBlueHours === 0) { //then the day we just finished tabulated contained 0 blue hours so we need to put a dummy object on the graph
                let obj = {
                    x: lastDayEntryTime,
                    y: 9,
                    r: 0
                }
                dailySummaryDetail.push(obj)
            }

            dailyBlueHours = 0; //reset the blue hours so that the next day begins at 0
            //console.log("the day has advanced")
            dayIndex++;
            //console.log(dailySummary)
        }
        //console.log(currentDayBeingTabulated)


        let tempDewDelta: number = period.temperature - f; //compare the current temperature to the dewpoint and record the delta
        let windSpeed: number = parseInt(period.windSpeed.substring(0, 2), 10); //.eriod.windSpeed comes with "mph". This gets rid of it.
        let goodConditions: boolean = false;

        //check to see if conditions are good
        let windThreshold = 11; //looking for a wind value thats < threshold
        let dewDeltaThreshold = 4; //looking for a delta that's > threshold
        let dewThreshold = 60; // looking for a dewpoint thats < threshold
        let temperatureThreshold = 65; //look for a temperature that's > threshold
        //console.log("Windspeed: " + windSpeed + " DewDelta: " + tempDewDelta);
        if (windSpeed < windThreshold && tempDewDelta > dewDeltaThreshold || period.temperature > temperatureThreshold && f < dewThreshold) {
            goodConditions = true;
            countOfBlueHours++;

            //add a blue hour to the current day being tabulated
            dailyBlueHours++;
            let currentBlueHour = parseInt(entryTime[1].substring(0, 2))

            //console.log(currentBlueHour)

            let obj = {
                x: entryTime[0],
                y: currentBlueHour,
                r: 10
            }

            dailySummaryDetail.push(obj);

            //console.log(dailySummaryDetail)

            streakOfBlueHours++;
            if (streakOfBlueHours > longestBlueHourStreak) {
                dayWithLongestBlueStreak = getDayOfWeek(getNumericalDate(entryTime))
                //console.log(entryTime[0].substring(5))
                longestBlueHourStreak = streakOfBlueHours;
            }
        } else {
            streakOfBlueHours = 0;
        }

        if (windSpeed < 10) { //insert a leading zero for a wind < 10
            windSpeed = parseInt(("0" + windSpeed),10); 
            //console.log("We appended a 0 to the front of a < 10 windspeed and got: " + windSpeed)
        }

        let date = entryTime[0].substring(5);
        let time = entryTime[1].substring(0, 2);
        let comboDateTime = `${time}:00 ${date}`
        //console.log(comboDateTime)

        //create a new object for each iteration. Each of these objects corresponds to one hour within the forecast. We'll have 156 of these in total
        let obj = {

            date: date,
            time: time,
            temperature: period.temperature,
            dewpoint: f,
            windDirection: period.windDirection,
            windSpeed: windSpeed,
            goodConditions: goodConditions
        }
        weatherObjects.push(obj);   //add the new object to the array that stores the forecast objects

        //create a new object that will populate the data structure for the dew point graph

        //console.log(dewObject)
        //each of the following .push lines create data to use in line charts
        dewPointData.push(f)
        dewPointPeriods.push(comboDateTime)
        tempData.push(period.temperature)
        deltaData.push(tempDewDelta)
        //console.log(dewPointData)
        lastDayTabulated = currentDayBeingTabulated;
        lastDayEntryTime = entryTime[0];
        periodIndex++;
        totalHours++;
    }


})

  const chartData: WeatherChartData = {
    dailySummary: dailySummary,
    dailySummaryDetailArray: dailySummaryDetail,
    dewPointPeriods: dewPointPeriods,
    dewPointData: dewPointData,
    tempData: tempData,
    deltaData: deltaData
  }

  setChartData(chartData)

  const weatherSummary: WeatherSummary = {
    countOfBlueHours: countOfBlueHours,
    dayWithLongestBlueStreak: dayWithLongestBlueStreak,
    longestBlueHourStreak: longestBlueHourStreak,
    totalHours: countOfBlueHours
  }

  setWeatherSummary(weatherSummary)
  
  return weatherObjects;
};



export default parseForecast;
