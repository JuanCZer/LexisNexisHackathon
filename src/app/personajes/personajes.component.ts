import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../services/rick-and-morty.service';

@Component({
  selector: 'app-personajes',
  standalone: false,
  templateUrl: './personajes.component.html',
  styleUrl: './personajes.component.css',
})
export class PersonajesComponent implements OnInit {
  personajes: any[] = [];
  selectedCharacter: any = null;
  showModal: boolean = false;

  constructor(private rickAndMortyService: RickAndMortyService) {}

  ngOnInit(): void {
    this.rickAndMortyService.getCharacters().subscribe((data: any) => {
      // Se asume que la respuesta es { info: {...}, results: [...] }
      this.personajes = data.results;
    });
  }

  openModal(personaje: any) {
    this.selectedCharacter = personaje;
    this.showModal = true;
  }

  closeModal() {
    this.selectedCharacter = null;
    this.showModal = false;
  }
}
