import { Component } from '@angular/core';
import {ApiService} from "../api.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-usa-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usa-map.component.html',
  styleUrl: './usa-map.component.css'
})
export class UsaMapComponent {
  weather: any = {};
  constructor (private apiService: ApiService) {}
  setWeatherData(event: any ) {
    console.log('event', event.target.id);
    this.apiService.setWeatherData(event.target.id).subscribe((data: any) => {
      console.log(data)
      this.weather = {
        ...data,
        state: event.target.getAttribute('title')
      }
    })
  }
}
