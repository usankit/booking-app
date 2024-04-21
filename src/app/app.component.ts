import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FlightListComponent } from './flight-list/flight-list.component';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, ButtonModule, FlightListComponent,FormsModule]
})
export class AppComponent {
  title = 'flight-booking-app';
}
