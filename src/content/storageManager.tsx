import { DisplayStyle, Color } from 'src/types';

export default class StorageManager {

  private _browserStorage = browser.storage;
  private domainsList: Array<any> = [];

  get browserStorage () {
    return this._browserStorage;
  }

  /*
   * Fetching domains list from sync storage
   */
  public async fetchDomainsList () {
    return this._browserStorage.sync.get('domainsList')
      .then((res) => res.domainsList as Array<any> || []);
  }

  /*
   * Fetching options from sync storage
   */
  public async fetchOptions () {
    return this._browserStorage.sync.get('options')
      .then((res) => res.options as any || {});
  }

  /*
   * Add domain to storage domains list
   */
  public async save (domainName: string, display: DisplayStyle, color?: Color) {
    this.domainsList = await this.fetchDomainsList();
    let domainAlreadyStored: boolean = false;

    // Check if domain is already stored
    this.domainsList.forEach(d => {
      if(d.domainName === domainName){
        domainAlreadyStored = true;
        if(color){
          d.display = display;
          d.color = color;
        } else {
          d.display = display;
        }
      }
    });

    // Push new entry if domain do not exists in domains list
    if(!domainAlreadyStored) {
      if(color) {
        this.domainsList.push({
          domainName,
          display,
          color
        });
      } else {
        this.domainsList.push({
          domainName,
          display
        });
      }
    }

    // Store data in storage sync
    const domainsList = this.domainsList;
    this._browserStorage.sync.set({domainsList});
  }
}
