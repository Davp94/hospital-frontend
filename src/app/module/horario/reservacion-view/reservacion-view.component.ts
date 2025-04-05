import { AfterViewInit, Component, inject, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AppStore } from '../../../state-management/state.store';
import { ReservacionService } from '../../../core/service/reservacion.service';
import { PaginationRequestDto } from '../../../core/dto/pagination-request.dto';
import { ReservacionDto } from '../../../core/dto/reservacion.dto';
import { PaginationDto } from '../../../core/dto/pagination.dto';
import { MatSort, Sort } from '@angular/material/sort';
import { FormControl, FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-reservacion-view',
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './reservacion-view.component.html',
  styleUrl: './reservacion-view.component.scss'
})
export class ReservacionViewComponent implements AfterViewInit, OnInit, OnChanges{
  displayedColumns: string[] = ['id', 'espNombre', 'espDescripcion', 'acciones'];
  dataSource = new MatTableDataSource<ReservacionDto>();
  pageRequest: PaginationRequestDto;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  store = inject(AppStore);
  totalPages: number = 0;
  searchControl = new FormControl('')


  constructor(private reservacionService: ReservacionService){
    this.pageRequest = {
      direction: 'ASC',
      page: 0,
      size: 10,
      sortBy: 'espNombre',
      searchParam: ''
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("🚀 ~ ReservacionViewComponent ~ ngOnChanges ~ changes:", changes)
    // this.loadReservaciones();
  }
  ngOnInit(): void {
    this.loadReservaciones();
    this.searchControl.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(searchText => {
      this.pageRequest.searchParam = searchText!;
      this.loadReservaciones();
    })
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe((sort: Sort) => {
      this.pageRequest.direction = sort.direction.toUpperCase();
      this.loadReservaciones();
    })
  }

  loadReservaciones() {
    this.reservacionService.listReservacionPagination(this.pageRequest).subscribe({
      next: (res: PaginationDto)=> {
        this.dataSource.data = res.content;
        this.paginator.pageIndex = res.pageNumber;
        this.paginator.pageSize = res.pageSize;
        this.paginator.length = res.totalElements;
        this.totalPages = res.totalPages;
      }
    })
  }

  onPageChange(event: PageEvent){
    this.pageRequest.page = event.pageIndex;
    this.pageRequest.size = event.pageSize;
    this.loadReservaciones();
  }

  generarReporte() {
    this.reservacionService.generateReport(this.store.userData()?.pacUsername as string).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const downloader = document.createElement('a');
        downloader.href = url;
        downloader.download = `reservaciones-${this.store.userData()?.pacUsername}.pdf`;
        document.body.appendChild(downloader);
        downloader.click()
        window.URL.revokeObjectURL(url);
        document.body.removeChild(downloader)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
