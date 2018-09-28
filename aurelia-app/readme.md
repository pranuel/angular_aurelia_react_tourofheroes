## Install required tools

```shell
npm install -g yarn
```

## Install dependencies

```shell
yarn [install]
```

## Build

```shell
yarn build
```

_(defaults to development build)_

### Development

```shell
yarn build:dev
```

### Production

```shell
yarn build:prod
```

## Run

```shell
yarn start
```

### Run with Aurelia's Hot Module Reload (HMR) capabilities

```
yarn start --hot
```

## Test

```shell
yarn test
```

### Run tests only for changed specs

```shell
yarn test --onlyChanged
```

### Run in watch mode

```shell
yarn test --watch
```

## Lint

```shell
yarn lint
```

## Check for outdated yarn packages

```shell
yarn outdated
```

## Upgrade interactively

```shell
yarn upgrade-interactive [--latest]
```

## Configure

You can change the api endpoint and the App Insights instrumentation key. Just edit `static/config/app-config.js`.
In order to change the build configuration edit the file `static/config/build-config.js`.

If you edit files in `static/` folder e.g. api endpoint, you should run webpack command again.

# Docs

*   How to choose the right rxjs operator: http://reactivex.io/rxjs/manual/overview.html#choose-an-operator
*   RxJs marbles: http://rxmarbles.com/

# Development guidelines for new web apps

*   move shared code to `drill360-common/` only if it is required by all web apps
*   move shared code to the root web app if it is used by more than one web app but not by all web apps
*   use absolute paths when importing stuff from `drill360-common/`
*   use relative paths when importing stuff from the web app itself
*   create a `{web_app_name}.ts` and a `{web_app_name}.html` containing the route config and a router-view for this web app
*   use a folder named views and put all views inside this folder. the folder structure should reflect the url route structure
