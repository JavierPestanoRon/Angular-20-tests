import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FallBackImage } from './fall-back-image';

@Component({
  standalone: true,
  imports: [FallBackImage],
  template: `<img appFallBackImage [src]="imgSrc" alt="Test Image">`,
})
class TestHostComponent {
  imgSrc = 'invalid/image/path.jpg';
}

describe('FallBackImage', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let imgDebugElement: DebugElement;
  let imgElement: HTMLImageElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    imgDebugElement = fixture.debugElement.query(By.css('img'));
    imgElement = imgDebugElement.nativeElement;
  });

  it('should create the directive', () => {
    const directiveInstance = imgDebugElement.injector.get(FallBackImage);
    expect(directiveInstance).toBeTruthy();
  });

  it('should set fallback image on error', () => {
    // Simular error
    imgElement.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    expect(imgElement.src).toContain('/images/placeholder.png');
  });
});
