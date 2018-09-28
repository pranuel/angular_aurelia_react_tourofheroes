import { autoinject } from 'aurelia-dependency-injection';
import { Hero, HeroService } from 'tour-of-heroes-shared';

@autoinject
export class HeroesComponent {

  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  activate() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name?: string): void {
    if (!name) { return; }
    name = name.trim();
    this.heroService.addHero({ name } as Hero);
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero);
    this.getHeroes();
  }

}
