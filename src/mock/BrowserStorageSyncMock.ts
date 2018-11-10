export default class {
  storage = {
    domainsList: [
      {domainName: "www.test.pl", hideStyle: "PARTIAL_HIDE"},
      {domainName: "www.onet.pl", hideStyle: "FULL_HIDE"}
    ]
  };

  set(value: any) {
    const storageCopy = {...this.storage};
    const objectName = Object.keys( value )
    storageCopy[objectName[0]] = value;
    this.storage = storageCopy;
  }

  get(value: string) {
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
