import { fetchWeatherApi } from 'openmeteo';
import { ComponentProps, useEffect, useState } from 'react';
import { weatherCodeToColor, weatherCodeToIcon, weatherCodeToName } from '@/weather/weatherCodeMaps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getWeatherQuote } from '@/weather/weatherQuote';
// Helper function to form time ranges
const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);


const params = {
    "latitude": 52.2298,
    "longitude": 21.0118,
    "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "sunrise", "sunset", "daylight_duration", "sunshine_duration", "rain_sum", "showers_sum", "snowfall_sum"],
    "timezone": "Europe/Berlin",
    "forecast_days": 1,
    "models": "dmi_seamless"
};
const url = "https://api.open-meteo.com/v1/forecast";

export type WeatherIcon = ComponentProps<typeof MaterialCommunityIcons>['name'];

export type Weather = {
    time: Date[],
    weatherCode: number,
    weatherName: string,
    weatherIcon: WeatherIcon,
    weatherColor: string,
    weatherQuote: string,
    temperature2mMax: number,
    temperature2mMin: number,
    sunrise: number,
    sunset: number,
    daylightDuration: number,
    sunshineDuration: number,
    rainSum: number,
    showersSum: number,
    snowfallSum: number,
}


const processData = (response: Awaited<ReturnType<typeof fetchWeatherApi>>): Weather => {
    const firstLocation = response[0];

    const utcOffsetSeconds = firstLocation.utcOffsetSeconds();

    const daily = firstLocation.daily()!;

    const getValue = (index: number) => {
        try {
            const rawValue = daily.variables(index)!.valuesArray()![0]
            return parseInt(rawValue.toPrecision(2),10);
        } catch (e) {
            return 0;
        }
    };

    const rawData = {
        time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
            (t) => new Date((t + utcOffsetSeconds) * 1000)
        ),
        weatherCode: getValue(0),
        temperature2mMax: getValue(1),
        temperature2mMin: getValue(2),
        sunrise: getValue(3),
        sunset: getValue(4),
        daylightDuration: getValue(5),
        sunshineDuration: getValue(6),
        rainSum: getValue(7),
        showersSum: getValue(8),
        snowfallSum: getValue(9),
    }

    return {
        ...rawData,
        weatherName: weatherCodeToName(rawData.weatherCode),
        weatherIcon: weatherCodeToIcon(rawData.weatherCode),
        weatherColor: weatherCodeToColor(rawData.weatherCode),
        weatherQuote: getWeatherQuote(rawData as Weather),
    };
}

export const useWeather = () => {

    const [weather, setWeather] = useState<Weather>();

    useEffect(() => {
        fetchWeatherApi(url, params).then(processData).then(setWeather);
    }, []);

    return {
        weather,
    }

}
