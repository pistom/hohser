import { DisplayStyle, Color } from 'src/types';
import 'chrome-storage-promise';

export default class StorageManager {

  // Browser storage object - using chrome-storage-promise on Chrome browser
  private _browserStorage = typeof browser === 'undefined' ? (chrome.storage as any).promise : browser.storage;
  // Oryginal chrome browser storage - to be able to listen onChange events on Chrome
  private _oryginalBrowserStorage = typeof browser === 'undefined' ? (chrome.storage as any) : browser.storage;

  private domainsList: Array<any> = [];

  get browserStorage () {
    return this._browserStorage;
  }

  get oryginalBrowserStorage () {
    return this._oryginalBrowserStorage;
  }

  /*
   * Fetching domains list from sync storage
   */
  public async fetchDomainsList () {
    return this._browserStorage.sync.get('domainsList')
      .then((res: any) => res.domainsList as Array<any> || []);
  }

  /*
   * Fetching options from sync storage
   */
  public async fetchOptions () {
    return this._browserStorage.sync.get('options')
      .then((res: any) => res.options as any || {});
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
