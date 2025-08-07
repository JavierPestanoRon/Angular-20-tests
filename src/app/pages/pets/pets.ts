import { Component, inject, OnInit } from '@angular/core';
import { PetsService } from '../../core/services/pets.service';
import PetList from './components/pet-list/pet-list';
import { PetOfTheDay } from "./components/pet-of-the-day/pet-of-the-day";
import { CommonModule } from '@angular/common';
import { Observable, map, shareReplay } from 'rxjs';
import { PetWithHealth } from '../../core/models/pets.interface';

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [CommonModule, PetList, PetOfTheDay],
  templateUrl: './pets.html',
  styleUrl: './pets.scss'
})
export default class Pets implements OnInit {
  readonly petsSvc = inject(PetsService);

  pets$!: Observable<PetWithHealth[]>;
  petOfTheDay$!: Observable<PetWithHealth | undefined>;

  ngOnInit() {
    this.pets$ = this.petsSvc.getAllPets().pipe(
      shareReplay(1)
    );

    // With signals
    // pets = toSignal(this.petService.getAllPets());

    this.petOfTheDay$ = this.pets$.pipe(
      map(pets => {
        const today = new Date().getDate();
        return pets.find(pet => pet.id === today);
      })
    );
  }
}
