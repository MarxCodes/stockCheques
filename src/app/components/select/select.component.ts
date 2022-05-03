import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() selected;
  @Output() delete = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  deleteItem(){
    this.delete.emit();
  }

}
