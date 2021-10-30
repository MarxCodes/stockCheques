import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {OverlayModule} from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
// import { MatButtonModule } from "@angular/material/button";
// import { MatToolbarModule } from "@angular/material/toolbar";


import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { LineChartyComponent } from './line-charty/line-charty.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TableComponent } from './table/table.component';
import { ComparisonChartComponent } from './comparison-chart/comparison-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from './filter.pipe';
import { AutocompleteModule } from './autocomplete/autocomplete.module';
import { MatSidenavComponent } from './mat-sidenav/mat-sidenav.component';
import { SelectComponent } from './components/select/select.component';
import { KeysPipe } from './keys.pipe';
import { SearchControlComponent } from './search-control/search-control.component';
import { RadioElComponent } from './components/radio-el/radio-el.component';
import { PracticeConsoleComponent } from './practice-console/practice-console.component';
import { PracticeControlComponent } from './practice-control/practice-control.component';
import { ShortenTextPipe } from './shorten-text.pipe';
import { FlipTransitionsComponent } from './services/flip-transitions/flip-transitions.component';
@NgModule({
  declarations: [
    AppComponent,
    LineChartyComponent,
    SideNavComponent,
    TableComponent,
    ComparisonChartComponent,
    FilterPipe,
    MatSidenavComponent,
    SelectComponent,
    KeysPipe,
    SearchControlComponent,
    RadioElComponent,
    PracticeConsoleComponent,
    PracticeControlComponent,
    ShortenTextPipe,
    FlipTransitionsComponent,

  ],
  imports: [
    AutocompleteModule,
    BrowserModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    OverlayModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    // MatToolbarModule,
    // MatButtonModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
