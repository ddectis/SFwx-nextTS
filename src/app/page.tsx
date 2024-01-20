"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Overview from "./components/Overview";
import Details from "./components/Details";
import fetchForecastData from "./utils/fetchForecastData";
import parseForecast from "./utils/parseForecast";
import { RawWeatherPeriod, ParsedWeatherPeriod, WeatherChartData } from "./types/types";

export default function Home() {
   const [forecastData, setForecastData] = useState<RawWeatherPeriod[]>([]);
   const [parsedForecast, setParsedForecast] = useState<ParsedWeatherPeriod[]>([]);
   const [useCachedForecast, setUseCachedForecast] = useState<boolean>(false);
   const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);
   const [chartData, setChartData] = useState<WeatherChartData>()

   //on page load, fetch the raw forecast data and set the state
   useEffect(() => {
      const fetchDataOnce = async () => {
         const rawForecastData = await fetchForecastData(
            useCachedForecast,
            setUseCachedForecast,
            lastUpdateTime, setLastUpdateTime
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
               setChartData
            )
         );
      }
   }, [forecastData, useCachedForecast]);

   function checkData(): void {
      console.log(parsedForecast);
   }

   return (
      <main className={styles.main}>
         <div className="app">
            <button onClick={checkData}>Yo</button>
            <Overview lastUpdateTime={lastUpdateTime} />
            <Details />
         </div>
      </main>
   );
}
