import { Component } from '@angular/core';
import { PicsumTestComponent } from '../../playground/picsum-test/picsum-test.component';
import { AddDocumentComponent } from '../../shared/firebase/add-document/add-document.component';
import { AuthStatusComponent } from '../../shared/firebase/auth-status/auth-status.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AddDocumentComponent, AuthStatusComponent, PicsumTestComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
