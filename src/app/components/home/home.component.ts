import { Component } from '@angular/core';
import { AddDocumentComponent } from '../../shared/firebase/add-document/add-document.component';
import { AuthStatusComponent } from '../../shared/firebase/auth-status/auth-status.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AddDocumentComponent, AuthStatusComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public title: string = 'Abstrax';
}
