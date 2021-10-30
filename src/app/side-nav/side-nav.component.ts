import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  sideNavOptions: [
    'first',
    'second',
    'third'
  ];
  clickedEls = [];
  options = [
    { id: 1, label: 'One' },
    { id: 2, label: 'Two' },
    { id: 3, label: 'a' },
    { id: 4, label: 'Thsdfsdree' },
    { id: 5, label: 'asd' },
    { id: 6, label: 'ax' },
    { id: 7, label: 'ax' },
    { id: 8, label: 'ae' },
    { id: 9, label: 'at' },
    { id: 10, label: 'af' },
    { id: 10, label: 'ag' },
    { id: 10, label: 'va' },
    { id: 10, label: 'ag' }
  ];
  control = new FormControl();

  showFiller = false;

  constructor() { }

  ngOnInit(): void {
  }

}
