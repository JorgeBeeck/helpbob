import { Component } from '@angular/core';

@Component({
  selector: 'app-overlay-window',
  standalone: true,
  template: `
    <div class="overlay-container">
      <h2>HelpBob Overlay</h2>
      <div class="status">
        Status: Conectado
      </div>
      <div class="info">
        Angular + Electron funcionando! 🎮
      </div>
    </div>
  `,
  styles: [`
    .overlay-container {
      padding: 20px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      border-radius: 8px;
    }
    .status {
      color: #4CAF50;
      margin: 10px 0;
    }
    .info {
      font-style: italic;
    }
  `]
})
export class OverlayWindow {}
