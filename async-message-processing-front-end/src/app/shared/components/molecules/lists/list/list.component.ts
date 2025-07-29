import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  imports: [],
  template: `
    <ng-content select="app-list-header"></ng-content>
    <ng-content select="app-list-item"></ng-content>
  `,
  styleUrl: './list.component.scss'
})
export class ListComponent {

}
