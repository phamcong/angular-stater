import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HighchartsChartModule } from 'highcharts-angular';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CovidMapComponent } from './components/covid-map/covid-map.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DataEffects } from './data/data.effects';
import * as fromData from './data/data.reducer';

const appState = {
  data: fromData.reducer
};

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    CovidMapComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(appState, {}),
    EffectsModule.forRoot([DataEffects]),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
