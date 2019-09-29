export default class {
  storage = {
    domainsList: [
      {domainName: "www.test.fr", display: "HIGHLIGHT", color: "COLOR_1"},
      {domainName: "www.onet.pl", display: "FULL_HIDE"},
      {domainName: "www.tvn24.pl", display: "PARTIAL_HIDE"},
      {domainName: "www.exemple-domain.us", display: "FULL_HIDE"},
      {domainName: "wwws.13-piatek.test.au", display: "PARTIAL_HIDE"},
      {domainName: "www.facebook.com", display: "FULL_HIDE"},
      {domainName: "www.swietlica-testowa-domena.warszawa.eu", display: "PARTIAL_HIDE"},
      {domainName: "www.interia.pl", display: "FULL_HIDE"},
      {domainName: "www.nrj.fr", display: "PARTIAL_HIDE"},
      {domainName: "www.download.australia.tu", display: "FULL_HIDE"},
      {domainName: "www.END_OF_LIST.pl", display: "FULL_HIDE"},
    ],
    options: {
      showAll: false,
      showCounter: false
    }
  };

  set (value: any) {
    const storageCopy = {...this.storage};
    const objectName = Object.keys( value );
    storageCopy[objectName[0]] = value;
    this.storage = storageCopy;
  }

  get (value: string) {
    return new Promise((resolve, reject) => {
      if (this.storage[value]) {
        const storageObject = {};
        storageObject[value] = this.storage[value];
        resolve(storageObject);
      }
      else {
        reject(Error(`There is no value called ${value} in storage.sync`));
      }
    });

  }
}
