import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { DataEffects } from './data/data.effects'
import { dataReducer } from './data/data.reducer'

const appState = {
  data: dataReducer
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(appState),
    EffectsModule.forRoot([DataEffects]),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
