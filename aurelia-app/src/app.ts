import { PLATFORM } from 'aurelia-pal';
import { RouterConfiguration } from 'aurelia-router';
import './app.scss';

export class App {

    title = 'Tour of Heroes';

    configureRouter(config: RouterConfiguration) {
        config.title = 'Tour of Heroes';

        // config.mapUnknownRoutes(PLATFORM.moduleName('./apps/home'));

        config.map([
            { route: '', redirect: 'dashboard' },
            {
                route: 'dashboard',
                name: 'dashboard',
                moduleId: PLATFORM.moduleName('./dashboard/dashboard'),
                title: 'Dashboard',
            },
            {
                route: 'heroes',
                name: 'heroes',
                moduleId: PLATFORM.moduleName('./heroes/heroes'),
                title: 'Cockpit360',
            },
            {
                route: 'detail/:id',
                name: 'detail',
                moduleId: PLATFORM.moduleName('./hero-detail/hero-detail'),
                title: 'Hero Detail',
            },
        ]);
    }
}