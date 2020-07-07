# Highlight or Hide Search Engine Results
#### A web extension that allows to highlight or hide search results.

### Available for
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/hohser/)
- [Chrome](https://chrome.google.com/webstore/detail/highlight-or-hide-search/ilopipickdimglkalhckioobifbiinbk)

### Supported search engines
- [Duckduckgo](https://duckduckgo.com)
- [Qwant](https://www.qwant.com)
- [Google](https://www.google.com)
- [Yahoo](https://fr.search.yahoo.com)
- [Bing](https://www.bing.com/)
- [Startpage](https://www.startpage.com)
- [Ecosia](https://www.ecosia.org)
- [Yandex](https://www.yandex.ru)

Add an issue if you would like to use the extension with another search engine.

## Development
The extension is created with ReactJs, Redux, Material UI and TypeScript.

### Requirements
- [Node.js](https://nodejs.org/) (latest)
- [Yarn](https://yarnpkg.com/) (latest)

```shell
$ git clone git@github.com:pistom/hohser.git
$ cd hohser
$ yarn
```

## Build
```shell
$ yarn build   // Packages will be built in the "build" directory.
```

## Load a built extension to Firefox
```shell
$ yarn load
```
or, if other than the default version of firefox
```shell
$ yarn load -- --firefox=<a full path to the binary file>
```
If you need more options (e.g. load with custom firefox profile), please refer to this article: [Getting started with web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/)