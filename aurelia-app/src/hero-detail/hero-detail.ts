import { autoinject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { Hero, HeroService } from 'tour-of-heroes-shared';

@autoinject
export class HeroDetailComponent {
  hero?: Hero;

  constructor(
    private router: Router,
    private heroService: HeroService
  ) { }

  activate(params: { id: string }): void {
    this.getHero(+params.id);
  }

  getHero(id: number): void {
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.router.navigateBack();
  }

  save(): void {
    if (!this.hero) {
      return;
    }
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}
