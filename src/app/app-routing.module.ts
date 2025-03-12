import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonajesComponent } from './personajes/personajes.component';
import { MapaComponent } from './mapa/mapa.component';
import { CapitulosComponent } from './capitulos/capitulos.component';

const routes: Routes = [
  { path: '', redirectTo: '/personajes', pathMatch: 'full' },
  { path: 'personajes', component: PersonajesComponent },
  { path: 'mapa', component: MapaComponent },
  { path: 'capitulos', component: CapitulosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
