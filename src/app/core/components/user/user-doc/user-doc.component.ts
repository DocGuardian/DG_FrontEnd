import { Component, Input } from '@angular/core';
import { Document } from 'src/app/core/models/document.model';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-user-doc',
  templateUrl: './user-doc.component.html',
  styleUrls: ['./user-doc.component.css'],
})
export class UserDocComponent {
  @Input() doc!: Document;
  @Input() sender?: User;
}
