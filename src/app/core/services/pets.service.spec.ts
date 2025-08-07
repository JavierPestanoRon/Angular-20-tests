import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PetsService } from './pets.service';
import { PetWithHealth } from '../models/pets.interface';

describe('PetsService', () => {
  let service: PetsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PetsService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(PetsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all pets', () => {
    const mockPets: PetWithHealth[] = [
      { id: 1, name: 'Fido', kind: 'dog', weight: 10, height: 30, length: 50, photo_url: '', description: '', health: 'Unhealthy' },
      { id: 2, name: 'Whiskers', kind: 'cat', weight: 5, height: 25, length: 40, photo_url: '', description: '', number_of_lives: 9, health: 'Unhealthy' }
    ];
    service.getAllPets().subscribe(pets => {
      expect(pets).toEqual(mockPets);
    });

    const req = httpMock.expectOne('https://my-json-server.typicode.com/Feverup/fever_pets_data/pets');
    expect(req.request.method).toBe('GET');
    req.flush(mockPets);
  });

  it('should fetch pet by id', () => {
    const mockPet: PetWithHealth = {
      id: 1,
      name: 'Fido',
      kind: 'dog',
      weight: 10,
      height: 30,
      length: 50,
      photo_url: '',
      description: '',
      health: 'Unhealthy'
    };
    service.getPetById('1').subscribe(pet => {
      expect(pet).toEqual(mockPet);
    });

    const req = httpMock.expectOne('https://my-json-server.typicode.com/Feverup/fever_pets_data/pets/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockPet);
  });
});
