"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Overview from "./components/Overview";
import Details from "./components/Details";
import Intro from "./components/Intro";
import fetchForecastData from "./utils/fetchForecastData";
import parseForecast from "./utils/parseForecast";
import {
   RawWeatherPeriod,
   ParsedWeatherPeriod,
   WeatherChartData,
   WeatherSummary,
} from "./types/types";

export default function Home() {
   const defaultChartData: WeatherChartData = {
      dailySummary: { Sat: 0, Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0 },
      dailySummaryDetailArray: [],
      dewPointPeriods: [],
      dewPointData: [],
      tempData: [],
      deltaData: [],
   };


   const [forecastData, setForecastData] = useState<RawWeatherPeriod[]>([]);
   const [parsedForecast, setParsedForecast] = useState<ParsedWeatherPeriod[]>(
      []
   );
   const [useCachedForecast, setUseCachedForecast] = useState<boolean>(false);
   const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);
   const [chartData, setChartData] = useState<WeatherChartData>(defaultChartData);
   const [weatherSummary, setWeatherSummary] = useState<WeatherSummary | null>(
      null
   );


   //on page load, fetch the raw forecast data and set the state
   useEffect(() => {
      const fetchDataOnce = async () => {
         const rawForecastData = await fetchForecastData(
            useCachedForecast,
            setUseCachedForecast,
            lastUpdateTime,
            setLastUpdateTime
         );
         setForecastData(rawForecastData);
      };
      fetchDataOnce();
   }, []);

   //once the raw forecast data has successfully loaded, call the parse method
   useEffect(() => {
      if (forecastData) {
         setParsedForecast(
            parseForecast(
               forecastData,
               useCachedForecast,
               setChartData,
               setWeatherSummary
            )
         );
      }
   }, [forecastData, useCachedForecast]);

   useEffect(() => {
      if (chartData) {
      }
   });

   function checkData(): void {
      console.log(chartData);
   }

   return (
      <main className={styles.main}>
         <button onClick={checkData}>Check</button>
         <div className="app">
            <Intro />
            <Overview
               lastUpdateTime={lastUpdateTime}
               weatherSummary={weatherSummary}
               weatherChartData={chartData}
            />
            <Details parsedForecast={parsedForecast} />
         </div>
      </main>
   );
}
