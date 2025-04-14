import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy{

  title = 'hospital-frontend';
  ngOnDestroy(): void {
    console.log('EXECUTING ON DESTROY')
  }
}
