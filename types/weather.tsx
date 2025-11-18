// types/weather.ts

export interface WeatherData {
  city: string;
  country: string;
  description: string;
  temperature: number;   // dalam Celcius
  feelsLike: number;
  humidity: number;
  icon: string;          // kode icon dari OpenWeather
}
