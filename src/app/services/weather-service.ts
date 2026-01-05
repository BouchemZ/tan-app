import { Injectable } from '@angular/core';
import { fetchWeatherApi } from "openmeteo";
import { Coordinates, GeolocationService } from './geolocation-service';

const url = "https://api.open-meteo.com/v1/forecast";

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private geoService: GeolocationService) {}
  

  public async getWeather() {
    const coords = await this.geoService.getCurrentLocation();
    const params = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      daily: "uv_index_max",
      current: ["temperature_2m", "cloud_cover"],
      forecast_days: 1,
    };
    return fetchWeatherApi(url, params);
  }
}
