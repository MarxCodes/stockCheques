import { Component, Input, OnInit, ViewChild, AfterContentChecked, ElementRef, ViewContainerRef, ContentChildren, ContentChild, TemplateRef, QueryList } from '@angular/core';
import { ConnectionPositionPair, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { NgControl, AbstractControl, FormControl } from '@angular/forms';
import { merge, Observable, fromEvent,interval, of } from 'rxjs';
import { map, switchMap, tap, filter, takeUntil, debounce } from 'rxjs/operators';
import { OptionComponent } from './option/option.component';
import { AutocompleteContentDirective } from './autocomplete-content.directive';
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  exportAs: 'appAutocomplete',

})
export class AutocompleteComponent  {

  @ViewChild('root') rootTemplate: TemplateRef<any>;
  @Input() ss;
  @ContentChild(AutocompleteContentDirective)
  content: AutocompleteContentDirective;
  @ContentChildren(OptionComponent) options: QueryList<OptionComponent>;
  noncetrol = new FormControl();

  @ViewChild('innit') inputEl;
  list = ['Rat', 'Ox', 'Tiger', 'Hare', 'Dragon', 'Serpent', 'Horse', 'Sheep', 'Monkey', 'Cock', 'Dog', 'Boar'];
  newEls = [];
  private overlayRef: OverlayRef;
  optionsClick() {
    // this.clickedEls = [];
    return this.options.changes.pipe(
      switchMap(options => {
        const clicks$ = options.map(option => option.click$);
        let clicked = merge(...clicks$);
        return clicked;
      }),
      tap(res => console.log('tapped', res))

      // map(res => this.clickedEls)
    );
  }
}
