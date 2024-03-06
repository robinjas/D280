import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  fetchWeatherData(city: string) {
    let formattedCity = city.split('-').join(' ');
    let apiKey = '9c5d446970c7905efb2a58c205ad59d1';
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${formattedCity}&appid=${apiKey}&units=imperial`;

    return this.http.get(api);
  }

  setWeatherData(city: string) {
    let subject = new Subject();
    this.fetchWeatherData(city).subscribe((data: any) => {
      subject.next({
        city: data.name,
        temp: `${Math.round(data.main.temp)} °F`,
        humidity: `${data.main.humidity}%`,
        wind: `${Math.round(data.wind.speed)}MPH`,
        icon: `https://api.openweathermap.org/w/${data.weather[0].icon}.png`

      })
    })
    return subject.asObservable();
  }
}

