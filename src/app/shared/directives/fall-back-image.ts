import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appFallBackImage]',
})
export class FallBackImage {

  noImageUrl = '/images/placeholder.png';

  private elementImg = inject(ElementRef);

  @HostListener('error')
  onError(): void {
    this.elementImg.nativeElement.src = this.noImageUrl;
  }

}
