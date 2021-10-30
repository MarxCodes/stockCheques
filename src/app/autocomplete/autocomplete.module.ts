import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './autocomplete.component';
import { OptionComponent } from './option/option.component';
import { AutocompleteDirective } from './autocomplete.directive';
import { AutocompleteContentDirective } from './autocomplete-content.directive';
import { FilterPipe } from './filter.pipe';



@NgModule({
  declarations: [
    AutocompleteComponent,
    OptionComponent,
    AutocompleteDirective,
    AutocompleteContentDirective,
    FilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AutocompleteComponent,
    OptionComponent,
    AutocompleteDirective,
    AutocompleteContentDirective
  ]
})
export class AutocompleteModule { }
