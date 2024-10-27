
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


export const fetchWeather = async ({ days, longitude, latitude }: FetchWeather): Promise<Weather[]> => {


    const responses = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=${days}`).then(r=>r.json());

    return new Array(responses.daily.time.length).fill(null).map((_, i) => ({
        time: responses.daily.time[i],
        weatherCode: responses.daily.weather_code[i],
        temperature2mMax: responses.daily.temperature_2m_max[i],
        temperature2mMin: responses.daily.temperature_2m_min[i]
    }));
}
