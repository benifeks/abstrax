import { Component } from '@angular/core';
import { AbstractBgComponent } from '../../components/abstract-bg/abstract-bg.component';
import { AbstractViewerComponent } from '../../components/abstract-viewer/abstract-viewer.component';
import { AddDocumentComponent } from '../../shared/firebase/add-document/add-document.component';
import { AuthStatusComponent } from '../../shared/firebase/auth-status/auth-status.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AddDocumentComponent,
    AuthStatusComponent,
    AbstractViewerComponent,
    AbstractBgComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public readonly testItems = Array.from({ length: 30 }, (_, i) => i + 1);
}
