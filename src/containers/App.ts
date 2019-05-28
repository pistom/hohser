import App from '../components/App/App';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { State } from 'src/reducers';
import { DisplayStyle, Color } from 'src/types';


function mapStateToProps (state: State) {
  return {
    domainsList: state.domains.domainsList,
    domainsListLoading: state.domains.domainsListLoading,
    options: state.options.options
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
    removeDomain: (index: number) => dispatch(actions.removeDomain(index)),
    clearDomainList: () => dispatch(actions.clearDomainList()),
    fetchDomainsList: () => dispatch(actions.fetchDomainsList()),
    importFromOldVersion: () => dispatch(actions.importFromOldVersion()),
    fetchOptions: () => dispatch(actions.fetchOptions()),
    toggleShowAll: () => dispatch(actions.toggleShowAll()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

