export default class StorageManager {

  private _browserStorage = browser.storage;

  get browserStorage () {
    return this._browserStorage;
  }

  /*
   * Fetching domains list from sync storage
   */
  async fetchDomainsList () {
    return this._browserStorage.sync.get('domainsList')
    .then((res) => res.domainsList as Array<any> || []);
  }

  /*
   * Fetching options from sync storage
   */
  async fetchOptions () {
    return this._browserStorage.sync.get('options')
    .then((res) => res.options as any || {});
  }
}
