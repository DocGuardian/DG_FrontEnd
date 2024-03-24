import { Component, Input } from '@angular/core';
import { Document } from 'src/app/core/models/document.model';

@Component({
  selector: 'app-docs-table',
  templateUrl: './docs-table.component.html',
  styleUrls: ['./docs-table.component.css'],
})
export class DocsTableComponent {
  @Input() documents!: Array<Document>;
}
