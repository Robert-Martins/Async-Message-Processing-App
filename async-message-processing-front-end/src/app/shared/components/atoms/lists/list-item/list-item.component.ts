import { Component } from '@angular/core';

@Component({
  selector: 'app-list-item',
  imports: [],
  template: `
    <ng-content></ng-content>
  `,
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent {

}
