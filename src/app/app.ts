import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FallBackImage } from './shared/directives/fall-back-image';

@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrl: './app.scss',
    imports: [RouterOutlet, FallBackImage]
})
export class App {
}
