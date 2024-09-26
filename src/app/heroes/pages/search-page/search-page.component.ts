import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})

export class SearchPageComponent {

  public heroes: Hero[] = [];
  public searchInput = new FormControl('');
  public selectedHero?: Hero;

  constructor(private heroesService: HeroesService, private router: Router) {}

  searchHero() {
    const value: string = this.searchInput.value || '';

    this.heroesService.getSuggestions(value).subscribe(heroes => this.heroes = heroes);
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.router.navigateByUrl(`heroes/${hero.id}`)

  }
}
