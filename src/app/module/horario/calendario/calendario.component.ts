import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HorarioService } from '../../../core/service/horario.service';
import { HorarioDto } from '../../../core/dto/horario.dto';
import { AppStore } from '../../../state-management/state.store';
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
      center: 'Horarios disponibles',
      right: 'dayGridMonth'
    },
    events: [],
    eventClick: this.handleClickEvent.bind(this),
    dateClick: this.dateClickEvent.bind(this)
  };
  mes: number = 0;
  horarios: HorarioDto[] = [];
  store = inject(AppStore);
  datesToCalendar: string[] = [];
  constructor(private horarioService: HorarioService) {

  }

  ngOnInit(): void {
    this.loadHorarios();
  }

  loadHorarios(){
    this.horarioService.getHorariosByMes(this.mes, true, this.store.docId() as number).subscribe({
      next: (res: HorarioDto[]) => {
        this.horarios = res
        this.markHorariosCalendar(res);
      },
      error: (err: any) => console.log(err)
    })
  }

  markHorariosCalendar(horarios: HorarioDto[]){
    const events = horarios.map(date => ({
      title: 'Disponible',
      start: date.horFecha,
      allDay: true,
      backgroundColor: '#ffffff',
      borderColor: '000000'
    }))
    this.calendarOptions.events = events;
  }


  handleClickEvent(arg: any): void{
    console.log("🚀 ~ CalendarioComponent ~ handleClickEvent ~ arg:", arg)
    //TODO navigate to reservaciones
  }

  dateClickEvent(arg: any): void {
    console.log("🚀 ~ CalendarioComponent ~ arg:", arg)
  }
}
