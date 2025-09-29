# Vitrine SIA

        
For testing purpose, backend services are plugged to [SIA Pas-de-Calais](https://vitrine.archeologie.pasdecalais.fr/). Please configure proxy target in `vite.config.ts` to fit your needs.

It requires 4 endpoints compatible with our [models](https://github.com/camptocamp/sia_vitrine/tree/main/src/domain), similar to:
 - [`/api/vitrine`](https://vitrine.archeologie.pasdecalais.fr/api/vitrine)
 - [`/api/chronologies`](https://vitrine.archeologie.pasdecalais.fr/api/chronologies)
 - [`/api/communes`](https://vitrine.archeologie.pasdecalais.fr/api/communes)
 - [`/api/listes/ListeMatiere`](https://vitrine.archeologie.pasdecalais.fr/api/listes/ListeMatiere)

& media access (which needs a [rework](https://github.com/camptocamp/sia_vitrine/issues/4) for easier deploiement, decoupled from current API)



## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn run test:unit
```


### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
