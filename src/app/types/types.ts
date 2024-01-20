type Elevation = {
  unitCode: string;
  value: number;
};

export type RawForecastData = {
  updated: string;
  units: string;
  forecastGenerator: string;
  generatedAt: string;
  updateTime: string;
  validTimes: string;
  elevation: Elevation;
  periods: RawWeatherPeriod[];
};

export type RawWeatherPeriod = {
    number: number;
    name: string;
    startTime: string;
    endTime: string;
    isDaytime: boolean;
    temperature: number;
    temperatureUnit: string;
    temperatureTrend: null | string;
    probabilityOfPrecipitation: {
      unitCode: string;
      value: number;
    };
    dewpoint: {
      unitCode: string;
      value: number;
    };
    relativeHumidity: {
      unitCode: string;
      value: number;
    };
    windSpeed: string;
    windDirection: string;
    icon: string;
    shortForecast: string;
    detailedForecast: string;
  };

  export type ParsedWeatherPeriod = any