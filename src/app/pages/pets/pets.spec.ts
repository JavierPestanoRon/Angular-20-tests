import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import Pets from './pets';
import { PetsService } from '../../core/services/pets.service';
import { PetWithHealth } from '../../core/models/pets.interface';

describe('Pets', () => {
  let component: Pets;
  let fixture: ComponentFixture<Pets>;

  const mockPets: PetWithHealth[] = [
    {
      id: 10,
      name: 'Oscar',
      kind: 'cat',
      weight: 3612,
      height: 25,
      length: 35,
      photo_url: '/assets/oscar.png',
      description: 'Friendly cat',
      number_of_lives: 9,
      health: 'Healthy'
    },
    {
      id: 11,
      name: 'Max',
      kind: 'dog',
      weight: 5000,
      height: 40,
      length: 60,
      photo_url: '/assets/max.png',
      description: 'Loyal dog',
      health: 'Healthy'
    }
  ];


  const mockPetsService = {
    getAllPets: jasmine.createSpy().and.returnValue(of(mockPets))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pets],
      providers: [
        provideHttpClient(),
        { provide: PetsService, useValue: mockPetsService }
      ]
    }).compileComponents();
    
    mockPetsService.getAllPets.calls.reset();
    fixture = TestBed.createComponent(Pets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Pets component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllPets once', () => {
    expect(mockPetsService.getAllPets).toHaveBeenCalledTimes(1);
  });

  it('should render pet of the day if id matches today\'s date', (done) => {
    const todayId = new Date().getDate();
    const expectedPet = mockPets.find(p => p.id === todayId);

    component.petOfTheDay$.subscribe(pet => {
      expect(pet).toEqual(expectedPet);
      done();
    });
  });
});
