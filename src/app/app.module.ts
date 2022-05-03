import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {OverlayModule} from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {LayoutModule} from '@angular/cdk/layout';

import { Routes, RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';

// import { MatButtonModule } from "@angular/material/button";
// import { MatToolbarModule } from "@angular/material/toolbar";


import { AppComponent } from './app.component';
import { DataService } from './data.service';
import {FlipTransitionsService } from './services/flip-transitions.service';
import { SearchControllerService } from './services/search-controller.service';
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
import { ConsoleWServiceComponent } from './console-w-service/console-w-service.component';
import { LoaderComponent } from './components/loader/loader.component';
import { StockTabComponent } from './components/stock-tab/stock-tab.component';
import { ComparisonComponent } from './components/comparison/comparison.component';
import { DetailComponent } from './components/detail/detail.component';
import { MouseoverSearchDirective } from './directives/mouseover-search.directive';
import { SeperatePipe } from './pipes/seperate.pipe';
import { DetailLineChartComponent } from './detail-line-chart/detail-line-chart.component';
import { HomeComponent } from './home/home.component';
import { HistoryTabComponent } from './history-tab/history-tab.component';
import { TabContainerComponent } from './tab-container/tab-container.component';
import { TabContentsComponent } from './tab-contents/tab-contents.component';
import { SearchConsoleComponent } from './search-console/search-console.component';
import { SinglePriceChartComponent } from './single-price-chart/single-price-chart.component';
// import { SearchConsoleComponent } from './search-console/search-console.component';

const routes : Routes = [
  { path: '', component: HomeComponent},
  { path: 'comparison', component: ComparisonComponent },
  { path: 'detail/:id/:name', component: DetailComponent },
]
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
    ConsoleWServiceComponent,
    LoaderComponent,
    StockTabComponent,
    ComparisonComponent,
    DetailComponent,
    MouseoverSearchDirective,
    SeperatePipe,
    DetailLineChartComponent,
    HomeComponent,
    HistoryTabComponent,
    TabContainerComponent,
    TabContentsComponent,
    SearchConsoleComponent,
    SinglePriceChartComponent,
    // SearchConsoleComponent,

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
    MatIconModule,
    MatTabsModule,
    LayoutModule,
    RouterModule.forRoot(routes),

    // MatToolbarModule,
    // MatButtonModule
  ],
  providers: [
    DataService,
    SearchControllerService,
    FlipTransitionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
