// app/actions.ts
'use server'

export async function WeatherSearch(city: string) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    return null; 
  }

  return data;
}