import { ComponentProps, useEffect, useState } from 'react';
import { weatherCodeToColor, weatherCodeToIcon, weatherCodeToName } from '@/weather/weatherCodeMaps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getWeatherQuote } from '@/weather/weatherQuote';
import { fetchWeather, Weather } from '@/api/weather';
import * as Location from 'expo-location';

export type WeatherIcon = ComponentProps<typeof MaterialCommunityIcons>['name'];
export type WeatherExtra = Weather & {
    weatherName: string,
    weatherIcon: WeatherIcon,
    weatherColor: string,
    weatherQuote: string,
    temperature: string,
    temperatureMin: string,
    temperatureMax: string,

}

const weatherExtra = (weather: Weather[]): WeatherExtra[] =>
    weather.map((rawData) => {
        return {
            ...rawData,
            weatherName: weatherCodeToName(rawData.weatherCode),
            weatherIcon: weatherCodeToIcon(rawData.weatherCode),
            weatherColor: weatherCodeToColor(rawData.weatherCode),
            weatherQuote: getWeatherQuote(rawData as Weather),
            temperature: ((rawData.temperature2mMax + rawData.temperature2mMin) / 2).toFixed(1),
            temperatureMin: rawData.temperature2mMin.toFixed(1),
            temperatureMax: rawData.temperature2mMax.toFixed(1),
        };
    })

export const useWeather = (days: number = 1) => {

    const [weather, setWeather] = useState<WeatherExtra[]>();
    const [location, setLocation] = useState<Location.LocationObject>({
        coords: {
            // Warsaw
            latitude: 52.2297,
            longitude: 21.0122,
        }
    } as Location.LocationObject);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    useEffect(() => {
        fetchWeather({
            days,
            longitude: location?.coords.longitude,
            latitude: location?.coords.latitude,
        })
            .then(weatherExtra)
            .then(setWeather)
            .catch((e) => {
                console.error(e);
                setErrorMsg('Failed to fetch weather data');
            });
    }, [days, location]);

    return {
        weather,
        errorMsg
    }

}
