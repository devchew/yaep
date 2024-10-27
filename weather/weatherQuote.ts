import { Weather } from '@/hoocks/useWeather';

export const getWeatherQuote = ({
                             temperature2mMax,
                             daylightDuration,
                             sunshineDuration,
                             rainSum,
                             showersSum,
                             snowfallSum
                         }: Weather) => {
    const quotes = [];

    // Temperature-based quotes
    if (temperature2mMax > 30) {
        quotes.push("Upalny dzień! Idealny czas na ochłodę w cieniu.");
    } else if (temperature2mMax > 20) {
        quotes.push("Ciepły dzień, może to dobry czas na spacer?");
    } else if (temperature2mMax > 10) {
        quotes.push("Chłodniej, ale nadal przyjemnie na zewnątrz.");
    } else if (temperature2mMax > 0) {
        quotes.push("Dzień jest chłodny, czas na ciepły sweter.");
    } else {
        quotes.push("Mróz za oknem, dbaj o ciepło!");
    }

    // Daylight and sunshine-based quotes
    if (sunshineDuration > daylightDuration * 0.75) {
        quotes.push("Pełne słońce przez większość dnia – korzystaj ze światła!");
    } else if (sunshineDuration > daylightDuration * 0.5) {
        quotes.push("Słoneczny dzień z nutą chmur, dobry czas na aktywności na świeżym powietrzu.");
    } else if (sunshineDuration < daylightDuration * 0.25) {
        quotes.push("Mało słońca dzisiaj – może to dobry moment na książkę przy kubku herbaty?");
    }

    // Precipitation-based quotes
    if (rainSum > 10 || showersSum > 10) {
        quotes.push("Zapowiada się deszczowy dzień, parasol w dłoń!");
    } else if (rainSum > 0 || showersSum > 0) {
        quotes.push("Możliwy przelotny deszcz – miej parasol na wszelki wypadek.");
    }

    if (snowfallSum > 5) {
        quotes.push("Śnieg pokrywa ziemię, czas na zimowe przygody!");
    } else if (snowfallSum > 0) {
        quotes.push("Możliwe opady śniegu, miej się na baczności.");
    }

    // Randomly select a quote from the available options
    return quotes.length ? quotes[Math.floor(Math.random() * quotes.length)] : "Pogoda nie zdradza dziś wielu emocji.";
};
