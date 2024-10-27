import { fetchWeatherApi } from 'openmeteo';

type FetchWeather = {
    days: number
    "latitude": number,
    "longitude": number,
}

export type Weather = {
    time: Date,
    weatherCode: number,
    temperature2mMax: number,
    temperature2mMin: number,
}

const url = "https://api.open-meteo.com/v1/forecast";

const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);


export const fetchWeather = async ({ days, longitude, latitude }: FetchWeather): Promise<Weather[]> => {
    const params = {
        latitude,
        longitude,
        "daily": [
            "weather_code",
            "temperature_2m_max",
            "temperature_2m_min",
        ],
        "timezone": "Europe/Berlin",
        "forecast_days": days,
        "models": "dmi_seamless"
    };

    const responses = await fetchWeatherApi(url, params);


    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();

    const daily = response.daily()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {

        daily: {
            time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            weatherCode: daily.variables(0)!.valuesArray()!,
            temperature2mMax: daily.variables(1)!.valuesArray()!,
            temperature2mMin: daily.variables(2)!.valuesArray()!
        },

    };

    return new Array(weatherData.daily.time.length).fill(null).map((_, i) => ({
        time: weatherData.daily.time[i],
        weatherCode: weatherData.daily.weatherCode[i],
        temperature2mMax: weatherData.daily.temperature2mMax[i],
        temperature2mMin: weatherData.daily.temperature2mMin[i]
    }));
}
