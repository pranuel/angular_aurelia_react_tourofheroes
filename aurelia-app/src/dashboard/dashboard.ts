import { autoinject } from 'aurelia-dependency-injection';
import { Hero, HeroService } from 'tour-of-heroes-shared';

@autoinject
export class DashboardComponent {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  activate() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes.slice(1, 5);
      });
  }
}
