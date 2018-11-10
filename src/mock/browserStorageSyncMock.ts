export default class {
  storage = {};

  set(value: any) {
    const storageCopy = {...this.storage};
    const objectName = Object.keys( value )
    storageCopy[objectName[0]] = value;
    this.storage = storageCopy;
  }

  get(value: string) {
    return new Promise((resolve, reject) => {
      if (this.storage[value]) {
        resolve(this.storage[value]);
      }
      else {
        reject(Error(`There is no value called ${value} in storage.sync`));
      }
    });
    
  }
}
