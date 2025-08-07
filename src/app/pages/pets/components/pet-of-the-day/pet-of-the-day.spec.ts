import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PetOfTheDay } from './pet-of-the-day';
import { Router } from '@angular/router';
import { PetStateService } from '../../../../shared/service/pet-state.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('PetOfTheDay', () => {
  let component: PetOfTheDay;
  let fixture: ComponentFixture<PetOfTheDay>;

  const routerMock = {
    navigate: jasmine.createSpy('navigate')
  };

  const petStateServiceMock = {
    setPet: jasmine.createSpy('setPet'),
    getIsPetOfTheDayVisible: jasmine.createSpy('getIsPetOfTheDayVisible').and.returnValue(of(true))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetOfTheDay],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: PetStateService, useValue: petStateServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PetOfTheDay);
    component = fixture.componentInstance;
  });

  describe('general rendering', () => {
    beforeEach(() => {
      component.pet = {
        id: 1,
        name: 'Fido',
        kind: 'dog',
        weight: 20,
        height: 50,
        length: 80,
        photo_url: 'https://example.com/fido.jpg',
        description: 'Friendly dog',
        health: 'Healthy'
      };
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render pet name, kind, image and description', () => {
      const titleEl = fixture.nativeElement.querySelector('mat-card-title');
      const subtitleEl = fixture.nativeElement.querySelector('mat-card-subtitle');
      const imgEl = fixture.nativeElement.querySelector('img');
      const descEl = fixture.nativeElement.querySelector('mat-card-content p');

      expect(titleEl.textContent).toContain('Fido');
      expect(subtitleEl.textContent).toContain('dog');
      expect(imgEl.src).toBe('https://example.com/fido.jpg');
      expect(descEl.textContent).toContain('Friendly dog');
    });

    it('should call setPet and navigate on goToDetails', () => {
      component.goToDetails();
      expect(petStateServiceMock.setPet).toHaveBeenCalledWith(component.pet);
      expect(routerMock.navigate).toHaveBeenCalledWith(['/pet-details']);
    });
  });

  describe('description fallback', () => {
    it('should show fallback message if description is missing', () => {
      component.pet = {
        id: 2,
        name: 'Mittens',
        kind: 'cat',
        weight: 5,
        height: 25,
        length: 40,
        photo_url: 'https://example.com/mittens.jpg',
        description: '',
        number_of_lives: 9,
        health: 'Healthy'
      };
      fixture.detectChanges();

      const descEl = fixture.nativeElement.querySelector('mat-card-content p');
      expect(descEl.textContent).toContain('No description available.');
    });
  });

  describe('kind-specific rendering', () => {
    it('should render "dog" when kind is dog', () => {
      component.pet = {
        id: 3,
        name: 'Baxter',
        kind: 'dog',
        weight: 15,
        height: 40,
        length: 60,
        photo_url: 'https://example.com/baxter.jpg',
        description: 'A loyal companion',
        health: 'Healthy'
      };
      fixture.detectChanges();

      const subtitleEl = fixture.nativeElement.querySelector('mat-card-subtitle');
      expect(subtitleEl.textContent).toContain('dog');
    });

    it('should render "cat" when kind is cat', () => {
      component.pet = {
        id: 4,
        name: 'Whiskers',
        kind: 'cat',
        weight: 4,
        height: 30,
        length: 45,
        photo_url: 'https://example.com/whiskers.jpg',
        description: 'A sneaky feline',
        number_of_lives: 9,
        health: 'Healthy'
      };
      fixture.detectChanges();

      const subtitleEl = fixture.nativeElement.querySelector('mat-card-subtitle');
      expect(subtitleEl.textContent).toContain('cat');
    });
  });

  describe('button interaction', () => {
    it('should trigger goToDetails when button is clicked', () => {
      component.pet = {
        id: 5,
        name: 'Bolt',
        kind: 'dog',
        weight: 18,
        height: 55,
        length: 75,
        photo_url: 'https://example.com/bolt.jpg',
        description: 'Fast and fearless',
        health: 'Healthy'
      };
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('button'));
      button.triggerEventHandler('click');

      expect(petStateServiceMock.setPet).toHaveBeenCalledWith(component.pet);
      expect(routerMock.navigate).toHaveBeenCalledWith(['/pet-details']);
    });
  });
});
