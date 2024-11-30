import { AxiosResponse } from "axios";
import { client } from "./apiClient";

export async function getWeather() {
    const response: AxiosResponse = await client.get(`WeatherForecast`);
    return response;
}