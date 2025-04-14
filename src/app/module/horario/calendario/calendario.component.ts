import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HorarioService } from '../../../core/service/horario.service';
import { HorarioDto } from '../../../core/dto/horario.dto';
import { AppStore } from '../../../state-management/state.store';
import { Router } from '@angular/router';
@Component({
  selector: 'app-calendario',
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent implements OnInit{
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      right: 'dayGridMonth'
    },
    dateClick: this.dateClickEvent.bind(this),
    dayCellContent: this.handleDayCellContent.bind(this)
  };
  mes: number = new Date().getMonth() +1;
  horarios: HorarioDto[] = [];
  store = inject(AppStore);
  datesToCalendar: string[] = [];
  @ViewChild('calendar') calendarComponent: any;
  constructor(private horarioService: HorarioService, private router: Router) {

  }

  ngOnInit(): void {
    this.loadHorarios();
  }

  handleDayCellContent(arg: any) {
    // Get the date and day number
    const date = arg.date;
    const dayNumber = date.getDate();

    // Get count for this date
    const count = this.getCountForDate(date);
    console.log("🚀 ~ CalendarioComponent ~ handleDayCellContent ~ count:", count)

    // Create container
    const container = document.createElement('div');
    container.style.position = 'relative';
    container.style.height = '100%';
    container.style.minHeight = '70px';
    // Create day number element
    const dayEl = document.createElement('span');
    dayEl.innerHTML = dayNumber.toString();

   // Add day number to container
   container.appendChild(dayEl);

   // Only add the availability text if there's data for this date
   if (count > 0) {
     // Create availability element at the bottom
     const availabilityEl = document.createElement('div');
     availabilityEl.innerHTML = `${count}`;
     availabilityEl.style.position = 'absolute';
     availabilityEl.style.bottom = '20px';
     availabilityEl.style.left = '0';
     availabilityEl.style.right = '20px';
     availabilityEl.style.fontSize = '0.8em';
     availabilityEl.style.color = '#0066cc';
     availabilityEl.style.fontWeight = 'bold';

     // Add to container
     container.appendChild(availabilityEl);
   }

   return { domNodes: [container] };
  }

  loadHorarios(){
    this.horarioService.getHorariosByMes(this.mes, true, this.store.docId() as number).subscribe({
      next: (res: HorarioDto[]) => {
        this.horarios = res;
        if (this.calendarComponent) {
          // Force calendar to re-render
          this.calendarComponent.getApi().render();
        }
      },
      error: (err: any) => console.log(err)
    })
  }

  // Method to get the count for a given date (implement your logic here)
  getCountForDate(date: Date): number {
    console.log("🚀 ~ CalendarioComponent ~ getCountForDate ~ date:", date)
    console.log('HORARIOS', this.horarios)
    const formattedDate = this.formatDate(date);
    console.log("🚀 ~ CalendarioComponent ~ getCountForDate ~ formattedDate:", formattedDate)
    // 2. Filter and count your data for this date
    const countForThisDate = this.horarios
      .filter(item => {
        const horarioFormatted = item.horFecha.substring(0, 10);
        console.log("🚀 ~ CalendarioComponent ~ getCountForDate ~ horarioFormatted:", horarioFormatted)
        return horarioFormatted === formattedDate;
      })
      .length;

    return countForThisDate;
  }

  formatDate(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  dateClickEvent(arg: any): void {
    const date = arg.date;
    const availableCount = this.getCountForDate(date);
    if(availableCount > 0){
      this.store.addFechaReservacion(this.formatDate(arg.date));
      this.router.navigate(["/horario/reservar"])
    }else {
      console.log('No hay horarios disponibles para esta fecha')
    }

  }
}
