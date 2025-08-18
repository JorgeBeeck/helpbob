import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OverlayWindow } from './overlay-window/overlay-window';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OverlayWindow],
  template: `
    <app-overlay-window></app-overlay-window>
    <router-outlet />
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('hearthstone-overlay');
}
