export default class {
  storage = {};

  set(value: any) {
    this.storage = {...this.storage, value}
    console.table(this.storage)
  }
}
