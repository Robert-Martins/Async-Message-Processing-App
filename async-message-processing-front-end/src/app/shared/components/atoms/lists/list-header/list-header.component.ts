import { Component } from '@angular/core';

@Component({
  selector: 'app-list-header',
  imports: [],
  template: `
    <ng-content></ng-content>
  `,
  styleUrl: './list-header.component.scss'
})
export class ListHeaderComponent {

}
