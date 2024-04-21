import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './flight-list.component.html',
  styleUrl: './flight-list.component.css',
})
export class FlightListComponent {

   constructor(private http: HttpClient) { this.getFlightData()}
  data:any;
  sortedData: any=[];
   order: string = '';
   currentSortField: string = '';
  isAscending: boolean = true;
  uniqueAirlines: Set<string> = new Set();
  uniqueAircraft:Set<string> = new Set();


  getFlightData(){
     this.http.get('https://api.npoint.io/378e02e8e732bb1ac55b').subscribe(data => {;
     console.log("my data",data);
     this.data=data;
    this.sortedData = [...this.data];
    this.extractUniqueAirlines();
    this.extractUniqueAirCraft();
   });
 }

 AirlineData(event: any) {
  const selectedAirline = event?.target?.value;
  if (selectedAirline) {
    this.sortedData = this.data.filter((item:any) => item.airline === selectedAirline);
  } else {
    this.sortedData = [...this.data];
  }
}


AircraftData(event: any) {
  const selectedAircraft = event?.target?.value;
  if (selectedAircraft) {
    this.sortedData = this.data.filter((item:any) => item.aircraft === selectedAircraft);
  } else {
    this.sortedData = [...this.data];
  }
}


 filterData(source: string, destination: string, date: string): void {
  this.sortedData = this.data.filter((item:any) => {
    return item.origin.toLowerCase().includes(source.toLowerCase()) &&
           item.destination.toLowerCase().includes(destination.toLowerCase()) &&
           item.departureTime.includes(date);
  });
}



extractUniqueAirlines(): void {
  // Extract unique airline names and add them to the Set
  this.data.forEach((item:any) => {
    this.uniqueAirlines.add(item.airline);
  });
}

extractUniqueAirCraft(): void {
  // Extract unique airline names and add them to the Set
  this.data.forEach((item:any) => {
    this.uniqueAircraft.add(item.aircraft)
  });
}



sortData(field: string): void {
  if (this.currentSortField === field) {
    this.isAscending = !this.isAscending;
  } else {
    this.currentSortField = field;
    this.isAscending = true;
  }

  this.sortedData = this.data.slice().sort((a:any, b:any) => {
    const valueA = a[field];
    const valueB = b[field];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return this.isAscending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    } else {
      return this.isAscending ? valueA - valueB : valueB - valueA;
    }
  });
}



}
