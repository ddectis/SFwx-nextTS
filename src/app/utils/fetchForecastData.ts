import { Dispatch, SetStateAction } from "react";

const fetchForecastData = async (
    useCachedForecast: boolean,
    setUseCachedForecast: Dispatch<SetStateAction<boolean>>,
    lastUpdatedTime: Date | null,
    setLastUpdatedTime: Dispatch<SetStateAction<Date | null>>
) => {
    const requestUrl: string =
        "https://api.weather.gov/gridpoints/MTR/83,102/forecast/hourly";
    try {
        const response = await fetch(requestUrl);
        //console.log(response);
        if (response.status === 200) {
            const data = await response.json();
            const stringifiedObject = JSON.stringify(data);
            //localStorage.setItem("cachedForecast", stringifiedObject)
            setLastUpdatedTime(new Date(data.properties.updateTime))
            
            console.log(data.properties);
            //handleLastUpdatedTime(data.properties.updatedTime, setLastUpdatedTime)
            return data.properties.periods; //Corresponds to hourly forecast for the next 156 hours
        } else {
            setUseCachedForecast(true);
        }
    } catch (error) {
        console.error("Failed to load forecast:", error);
        return null;
    }
};

export default fetchForecastData;
