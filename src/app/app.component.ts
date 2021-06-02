import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'angular-stater';
  public sidebarActions = [
    {
      label: 'Dashboard',
      key: 'dashboard',
      disabled: true,
      icon: 'bi bi-columns',
      onClick: () => { }
    },
    {
      label: 'Data visualization',
      key: 'data-viz',
      disabled: false,
      icon: 'bi bi-bar-chart-line',
      onClick: () => { }
    }
  ];
  public sltActionKey = 'data-viz';
  public overlay = false;

  constructor() { }

  ngOnInit() { }

}
