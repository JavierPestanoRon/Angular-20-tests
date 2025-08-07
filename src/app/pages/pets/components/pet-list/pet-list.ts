import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PetWithHealth } from '../../../../core/models/pets.interface';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { FallBackImage } from '../../../../shared/directives/fall-back-image';
import { Router } from '@angular/router';
import { PetStateService } from '../../../../shared/service/pet-state.service';
import { GramsToKgPipe } from '../../../../shared/pipes/grams-to-kg';
import { CmToMetersPipe } from '../../../../shared/pipes/cm-to-meters';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, FallBackImage, GramsToKgPipe, CmToMetersPipe],
  templateUrl: './pet-list.html',
  styleUrl: './pet-list.scss'
})
export default class PetList implements AfterViewInit, OnChanges {
  @Input() pets: PetWithHealth[] = [];

  displayedColumns: string[] = ['photo', 'name', 'kind', 'weight', 'height', 'length'];
  dataSource = new MatTableDataSource<PetWithHealth>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private router = inject(Router);
  private petStateSvc = inject(PetStateService);

  filterValue = '';

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    setTimeout(() => {
      this.sort.active = this.petStateSvc.getSortActive();
      this.sort.direction = this.petStateSvc.getSortDirection();
      this.sort.sortChange.emit({
        active: this.sort.active,
        direction: this.sort.direction
      });
      this.loadDataAndRestoreState();
    }, 0);

    this.sort.sortChange.subscribe((sortState: Sort) => {
      this.petStateSvc.setSortState(sortState.active, sortState.direction);
    });

    this.paginator.page.subscribe(event => {
      this.petStateSvc.setPageIndex(event.pageIndex);
      this.petStateSvc.setPageSize(event.pageSize);
    });
  }
  

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pets'] && !changes['pets'].firstChange) {
      this.loadDataAndRestoreState();
    }
  }

  private loadDataAndRestoreState() {
    this.dataSource.data = this.pets;

    this.dataSource.filter = this.filterValue.trim().toLowerCase();

    if (this.paginator) {
      setTimeout(() => {
        this.paginator.pageIndex = this.petStateSvc.getPageIndex();
        this.paginator.pageSize = this.petStateSvc.getPageSize();
        this.paginator._changePageSize(this.paginator.pageSize);
      }, 0);
    }
  }

  onRowClick(pet: PetWithHealth) {
    this.petStateSvc.setPet(pet);
    this.router.navigate(['/pet-details']);
  }
}
