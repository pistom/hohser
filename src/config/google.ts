import { SearchEngineConfig } from '../types';

export const google: SearchEngineConfig = {
  resultSelector: '.g, .mnr-c, .rg_bx, .rg_di, .rg_el, .ZINbbc, .JP1Bwd, .isv-r, .cUezCb, .KZmu8e, .EQ4p8c, .sh-dlr__list-result',
  domainSelector: '.yuRUbf a, .TbwUpd, .dTe0Ie, .xQ82C, .e8fRJf, .FnqxG, .UPmit, .gBIQub, .pDavDe, .fxgdke, .fxYMc, .IHk3ob, .E5ocAb, .lg3aE, [jsname="UWckNb"]',
  observerSelector: '#rcnt, #cnt, #rg, #main',
  resultUrlSelector: '.r > a',
  ajaxResults: true,
};
