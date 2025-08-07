import { ComponentFixture, TestBed } from '@angular/core/testing';

import PetList from './pet-list';
import { provideHttpClient } from '@angular/common/http';

describe('PetList', () => {
  let component: PetList;
  let fixture: ComponentFixture<PetList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetList],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
