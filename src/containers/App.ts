import App from '../components/App/App';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { State } from '../reducers';
import { DisplayStyle, Color, Domain } from '../types';


function mapStateToProps (state: State) {
  return {
    domainsList: state.domains.domainsList,
    domainsListLoading: state.domains.domainsListLoading,
    options: state.options.options,
    currentTabUrl: state.options.currentTabUrl
  };
}

function mapDispatchToProps (dispatch: Dispatch<actions.DomainAction | actions.OptionAction>) {
  return {
    addDomain: (domainName: string, hideType: DisplayStyle, color?: Color) => {
      dispatch(actions.addDomain(domainName, hideType, color));
    },
    editDomain: (index: number, domainName: string, hideType: DisplayStyle, color?: Color) => {
      dispatch(actions.editDomain(index, domainName, hideType, color));
    },
    removeDomain: (domainName: string) => dispatch(actions.removeDomain(domainName)),
    clearDomainList: () => dispatch(actions.clearDomainList()),
    importDomains: (domainsList: Domain[]) => dispatch(actions.importDomains(domainsList)),
    fetchDomainsList: () => dispatch(actions.fetchDomainsList()),
    importFromOldVersion: () => dispatch(actions.importFromOldVersion()),
    fetchOptions: () => dispatch(actions.fetchOptions()),
    toggleShowAll: () => dispatch(actions.toggleShowAll()),
    toggleForceColors: () => dispatch(actions.toggleForceColors()),
    setPartialHideOpacity: (opacity) => dispatch(actions.setPartialHideOpacity(opacity)),
    toggleShowCounter: () => dispatch(actions.toggleShowCounter()),
    toggleLocalStorage: () => dispatch(actions.toggleLocalStorage()),
    getCurrentUrl: () => dispatch(actions.getCurrentUrl()),
    updateHighlightCustomColors: (colors: string[]) => dispatch(actions.updateHighlightCustomColors(colors)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

