import { Component, Input, OnInit } from '@angular/core';
import { ActionItem } from './../../shared/interface';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.sass']
})

export class SideBarComponent implements OnInit {

  @Input() actions: ActionItem[] = [];
  @Input() selectedActionKey: string;
  @Input() expanded = false;
  @Input() overlay = false;

  public toggleAction: ActionItem = {
    icon: () => this.expanded ? 'bi bi-chevron-left' : 'bi bi-chevron-right',
    disabled: false,
    onClick: () => this.expanded = !this.expanded
  };

  get allActions() { return [this.toggleAction, ...this.actions]; }

  constructor() { }

  ngOnInit(): void {
  }

}
