import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    console.log('Home component initialized');
    this.weatherService.getWeather().then((responses) => {
      const response = responses[0];
      const current = response.current()!;
      const daily = response.daily()!;

      // Attributes for timezone and location
      const latitude = response.latitude();
      const longitude = response.longitude();
      const elevation = response.elevation();
      const utcOffsetSeconds = response.utcOffsetSeconds();

      console.log(
        `\nCoordinates: ${latitude}°N ${longitude}°E`,
        `\nElevation: ${elevation}m asl`,
        `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
      );

      // Note: The order of weather variables in the URL query and the indices below need to match!
      const weatherData = {
        current: {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          temperature_2m: current.variables(0)!.value(),
          cloud_cover: current.variables(1)!.value(),
        },
        daily: {
          time: Array.from(
            { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() }, 
            (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
          ),
          uv_index_max: daily.variables(0)!.valuesArray(),
        },
      };

      // The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
      console.log(
        `\nCurrent time: ${weatherData.current.time}\n`,
        `\nCurrent temperature_2m: ${weatherData.current.temperature_2m}`,
        `\nCurrent cloud_cover: ${weatherData.current.cloud_cover}`,
        `\nToday UV Index: ${weatherData.daily.uv_index_max?.[0] ?? 'N/A'}`
      );
      console.log("\nDaily data:\n", weatherData.daily)

    });
  }
}
