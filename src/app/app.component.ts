import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      disabled: false,
      icon: 'bi bi-columns',
      onClick: () => {
        alert(`onClick was trigged. Only 'link' or 'onClick' property should be specified, not both!`);
        this.router.navigate(['/dashboard']);
      }
    },
    {
      label: 'Data visualization',
      key: 'data-viz',
      disabled: false,
      icon: 'bi bi-bar-chart-line',
      link: 'data-viz'
    }
  ];
  public sltActionKey = 'dashboard';
  public overlay = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

}
