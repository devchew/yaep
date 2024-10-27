
/**
 * https://open-meteo.com/en/docs
 * WMO Weather interpretation codes (WW)
 * Code	Description
 * 0	Clear sky
 * 1, 2, 3	Mainly clear, partly cloudy, and overcast
 * 45, 48	Fog and depositing rime fog
 * 51, 53, 55	Drizzle: Light, moderate, and dense intensity
 * 56, 57	Freezing Drizzle: Light and dense intensity
 * 61, 63, 65	Rain: Slight, moderate and heavy intensity
 * 66, 67	Freezing Rain: Light and heavy intensity
 * 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
 * 77	Snow grains
 * 80, 81, 82	Rain showers: Slight, moderate, and violent
 * 85, 86	Snow showers slight and heavy
 * 95 *	Thunderstorm: Slight or moderate
 * 96, 99 *	Thunderstorm with slight and heavy hail
 * (*) Thunderstorm forecast with hail is only available in Central Europe
 * @param code
 */
import { ComponentProps } from 'react';
import { WeatherIcon } from '@/hoocks/useWeather';


export const weatherColors: { [key: number]: string } = {
    0: "#87CEEB",      // Clear sky - Light Sky Blue
    1: "#B0C4DE",      // Mainly clear - Light Steel Blue
    2: "#A9A9A9",      // Partly cloudy - Dark Gray
    3: "#808080",      // Overcast - Gray
    45: "#708090",     // Fog - Slate Gray
    48: "#778899",     // Depositing rime fog - Light Slate Gray
    51: "#C0C0C0",     // Drizzle Light - Silver
    53: "#A9A9A9",     // Drizzle Moderate - Dark Gray
    55: "#696969",     // Drizzle Dense - Dim Gray
    56: "#B0E0E6",     // Freezing Drizzle Light - Powder Blue
    57: "#4682B4",     // Freezing Drizzle Dense - Steel Blue
    61: "#87CEFA",     // Rain Slight - Light Sky Blue
    63: "#4682B4",     // Rain Moderate - Steel Blue
    65: "#0000CD",     // Rain Heavy - Medium Blue
    66: "#5F9EA0",     // Freezing Rain Light - Cadet Blue
    67: "#1E90FF",     // Freezing Rain Heavy - Dodger Blue
    71: "#ADD8E6",     // Snow Fall Slight - Light Blue
    73: "#B0C4DE",     // Snow Fall Moderate - Light Steel Blue
    75: "#A9A9A9",     // Snow Fall Heavy - Dark Gray
    77: "#D3D3D3",     // Snow Grains - Light Gray
    80: "#87CEFA",     // Rain Showers Slight - Light Sky Blue
    81: "#4682B4",     // Rain Showers Moderate - Steel Blue
    82: "#00008B",     // Rain Showers Violent - Dark Blue
    85: "#B0C4DE",     // Snow Showers Slight - Light Steel Blue
    86: "#A9A9A9",     // Snow Showers Heavy - Dark Gray
    95: "#FFD700",     // Thunderstorm Slight or Moderate - Gold
    96: "#FFA500",     // Thunderstorm with Hail Slight - Orange
    99: "#FF4500"      // Thunderstorm with Hail Heavy - Orange Red
};

export const weatherNames: { [key: number]: string } = {
    0: "Bezchmurne niebo",
    1: "Przeważnie bezchmurne, częściowo zachmurzone i pochmurne",
    2: "Przeważnie bezchmurne, częściowo zachmurzone i pochmurne",
    3: "Przeważnie bezchmurne, częściowo zachmurzone i pochmurne",
    45: "Mgła i osadzająca się szadź",
    48: "Mgła i osadzająca się szadź",
    51: "Mżawka: Lekka, umiarkowana i gęsta",
    53: "Mżawka: Lekka, umiarkowana i gęsta",
    55: "Mżawka: Lekka, umiarkowana i gęsta",
    56: "Marznąca mżawka: Lekka i gęsta",
    57: "Marznąca mżawka: Lekka i gęsta",
    61: "Deszcz: Lekki, umiarkowany i intensywny",
    63: "Deszcz: Lekki, umiarkowany i intensywny",
    65: "Deszcz: Lekki, umiarkowany i intensywny",
    66: "Marznący deszcz: Lekki i intensywny",
    67: "Marznący deszcz: Lekki i intensywny",
    71: "Opady śniegu: Lekkie, umiarkowane i intensywne",
    73: "Opady śniegu: Lekkie, umiarkowane i intensywne",
    75: "Opady śniegu: Lekkie, umiarkowane i intensywne",
    77: "Ziarna śniegu",
    80: "Przelotne opady deszczu: Lekkie, umiarkowane i gwałtowne",
    81: "Przelotne opady deszczu: Lekkie, umiarkowane i gwałtowne",
}


export const weatherIcons: { [key: number]: WeatherIcon } = {
    0: 'weather-sunny',
    1: 'weather-partly-cloudy',
    2: 'weather-cloudy',
    3: 'weather-cloudy',
    45: 'weather-fog',
    48: 'weather-fog',
    51: 'weather-rainy',
    53: 'weather-rainy',
    55: 'weather-rainy',
    56: 'weather-hail',
    57: 'weather-hail',
    61: 'weather-rainy',
    63: 'weather-rainy',
    65: 'weather-rainy',
    66: 'weather-hail',
    67: 'weather-hail',
    71: 'weather-snowy',
    73: 'weather-snowy',
    75: 'weather-snowy',
    77: 'weather-snowy',
    80: 'weather-pouring',
    81: 'weather-pouring',
    82: 'weather-pouring',
    85: 'weather-snowy',
    86: 'weather-snowy',
    95: 'weather-lightning',
    96: 'weather-lightning-rainy',
    99: 'weather-lightning-rainy'
}

export const weatherCodeToName = (code: number) => weatherNames[code] || 'Unknown'
export const weatherCodeToIcon = (code: number) => weatherIcons[code] || 'weather-sunny'
export const weatherCodeToColor = (code: number) => weatherColors[code] || '#333'
