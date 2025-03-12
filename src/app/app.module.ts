import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PersonajesComponent } from './personajes/personajes.component';
import { MapaComponent } from './mapa/mapa.component';
import { CapitulosComponent } from './capitulos/capitulos.component';
import { CharacterModalComponent } from './character-modal/character-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PersonajesComponent,
    MapaComponent,
    CapitulosComponent,
    CharacterModalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
