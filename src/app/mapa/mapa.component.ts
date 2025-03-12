import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  standalone: false,
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css',
})
export class MapaComponent implements AfterViewInit {
  public map!: L.Map;
  private marker!: L.Marker;

  // Valores iniciales para latitud y longitud
  public latitude: number = 40.73061;
  public longitude: number = -73.935242;

  ngAfterViewInit(): void {
    this.initMap();
    setTimeout(() => {
      this.map.invalidateSize();
    }, 100);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [this.latitude, this.longitude],
      zoom: 12,
    });

    // Exponemos la instancia del mapa para que el test pueda acceder a ella
    (window as any).map = this.map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
  }

  // Actualiza la vista del mapa con un zoom animado hasta el punto exacto y coloca un marcador
  public updateLocation(): void {
    const desiredZoom = 18; // Zoom deseado para ver el punto exacto
    this.map.flyTo([this.latitude, this.longitude], desiredZoom, {
      animate: true,
      duration: 2, // Duración de la animación en segundos
    });

    // Define el icono personalizado
    const customIcon = L.icon({
      iconUrl: '/assets/localizacion.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    // Agrega o actualiza un marcador con el icono personalizado
    if (this.marker) {
      this.marker.setLatLng([this.latitude, this.longitude]);
    } else {
      this.marker = L.marker([this.latitude, this.longitude], {
        icon: customIcon,
      }).addTo(this.map);
    }
  }

  // Actualiza la ubicación al presionar Enter en los campos
  public onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.updateLocation();
    }
  }
}
