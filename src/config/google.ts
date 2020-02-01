import { SearchEngineConfig } from '../types';

export const google: SearchEngineConfig = {
  resultSelector: '.g, .mnr-c, .rg_bx, .rg_di, .rg_el, .ZINbbc, .JP1Bwd, .isv-r',
  domainSelector: '.TbwUpd, .dTe0Ie, .xQ82C, .e8fRJf, .FnqxG, .BNeawe, .pDavDe, .fxgdke',
  observerSelector: '#rcnt, #cnt, #rg, #main',
  resultUrlSelector: '.r > a'
};
