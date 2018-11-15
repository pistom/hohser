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
    animations: state.options.animations
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
    fetchDomainsList: () => dispatch(actions.fetchDomainsList()),
    importFromOldVersion: () => dispatch(actions.importFromOldVersion())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

