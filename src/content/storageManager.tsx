export default class StorageManager {

  /*
   * Fetching domains list from sync storage
   */
  async fetchDomainsList () {
    return browser.storage.sync.get('domainsList')
    .then((res) => res.domainsList as Array<any> || []);
  }

}
