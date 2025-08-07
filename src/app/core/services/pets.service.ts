import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pet, PetListResponse, PetWithHealth } from '../models/pets.interface';
import { calculatePetHealth } from '../../shared/utils/calculate-pet-health';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  private readonly _http = inject(HttpClient);
  private readonly baseUrl = 'https://my-json-server.typicode.com/Feverup/fever_pets_data/pets';

  getAllPets(): Observable<PetWithHealth[]> {
    return this._http.get<PetListResponse>(this.baseUrl).pipe(
      map(pets => pets.map(this._mapWithHealth))
    );
  }

  getPetById(id: string): Observable<PetWithHealth> {
    return this._http.get<Pet>(`${this.baseUrl}/${id}`).pipe(
      map(this._mapWithHealth)
    );
  }

  private _mapWithHealth(pet: Pet): PetWithHealth {
    return {
      ...pet,
      health: calculatePetHealth(pet),
    };
  }
}
