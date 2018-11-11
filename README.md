# Highlight or Hide Search Engine Results
Highlight or hide search engine results from specific domains.
[addons.mozilla.org](https://addons.mozilla.org/pl/firefox/addon/hide-unwanted-search-engine-results/)

## Develop popup
```js
$ yarn
$ yarn start
```

## Load in Firefox
```js
$ yarn build
$ yarn load       // Run firefox and load built extension
$ yarn load:old   // Run firefox and load previous version ddghur
```
### Initial requirements
- Create new directory named `browser`.
- Create new firefox profile named `huser1` in `browser` directory (on Windows: `Win+R` and `Firefox.exe -P`)
- Clone old version of the extension (ddghur) to `browser/build.old` directory: 
```
$ git clone git@github.com:pistom/ddghur.git ./browser/build.old
```

## Test
```js
$ yarn test
```
