import { Injectable } from '@angular/core';
import { PetWithHealth } from '../../core/models/pets.interface';

@Injectable({ providedIn: 'root' })
export class PetStateService {
  private pet: PetWithHealth | null = null;
  private isPetOfTheDayVisible = false;

  private pageIndex = 0;
  private pageSize = 5;
  private sortActive = '';
  private sortDirection: 'asc' | 'desc' | '' = '';

  setPet(pet: PetWithHealth | null) {
    this.pet = pet;
  }

  getPet() {
    return this.pet;
  }

  setIsPetOfTheDayVisible(visible: boolean) {
    this.isPetOfTheDayVisible = visible;
  }

  getIsPetOfTheDayVisible(): boolean {
    return this.isPetOfTheDayVisible;
  }

  setPageIndex(index: number) {
    this.pageIndex = index;
  }

  getPageIndex(): number {
    return this.pageIndex;
  }

  setPageSize(size: number) {
    this.pageSize = size;
  }

  getPageSize(): number {
    return this.pageSize;
  }

  setSortState(active: string, direction: 'asc' | 'desc' | '') {
    this.sortActive = active;
    this.sortDirection = direction;
  }

  getSortActive(): string {
    return this.sortActive;
  }

  getSortDirection(): 'asc' | 'desc' | '' {
    return this.sortDirection;
  }
}
