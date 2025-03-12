import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../services/rick-and-morty.service';

@Component({
  selector: 'app-capitulos',
  standalone: false,
  templateUrl: './capitulos.component.html',
  styleUrl: './capitulos.component.css',
})
export class CapitulosComponent implements OnInit {
  episodes: any[] = [];

  constructor(private rickAndMortyService: RickAndMortyService) {}

  ngOnInit(): void {
    // Utiliza el método getEpisodes() para obtener los episodios
    this.rickAndMortyService.getEpisodes().subscribe((data: any) => {
      // Se asume que la respuesta tiene la forma { results: [...] }
      this.episodes = data.results.slice(0, 12);
    });
  }
}
