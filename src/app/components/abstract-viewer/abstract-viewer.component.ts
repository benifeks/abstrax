import { Component } from '@angular/core';
import { RandomImageComponent } from './random-image/random-image.component';

@Component({
  selector: 'app-abstract-viewer',
  imports: [RandomImageComponent],
  templateUrl: './abstract-viewer.component.html',
  styleUrl: './abstract-viewer.component.scss',
})
export class AbstractViewerComponent {}
