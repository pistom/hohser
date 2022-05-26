# Highlight or Hide Search Engine Results
#### A web extension that allows to highlight or hide search results.

### Available for
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/hohser/)
- [Chrome](https://chrome.google.com/webstore/detail/highlight-or-hide-search/ilopipickdimglkalhckioobifbiinbk)
- [Edge](https://microsoftedge.microsoft.com/addons/detail/highlight-or-hide-search-/bgbmlgjieadialcabijglgoigkjdfalk)

### Supported search engines
- [Duckduckgo](https://duckduckgo.com)
- [Google](https://www.google.com)
- [Yahoo](https://fr.search.yahoo.com)
- [Bing](https://www.bing.com/)
- [Startpage](https://www.startpage.com)
- [Ecosia](https://www.ecosia.org)
- [Yandex](https://www.yandex.ru)
- [OneSearch](https://www.onesearch.com/)
- [Baidu](http://www.baidu.com/) (partially)

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

## Import domains JSON structure
```json
[
  {
    "domainName":"www.domain1.com",
    "display":"HIGHLIGHT",
    "color":"COLOR_1"
  },
  {
    "domainName":"www.domain2.com",
    "display":"PARTIAL_HIDE"
  },
  {
    "domainName":"www.domain3.com",
    "display":"FULL_HIDE"
  },
  ...
]
```