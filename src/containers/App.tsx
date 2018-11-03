import App from '../components/App/App';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { FULL_HIDE, PARTIAL_HIDE } from 'src/constants';
import { DomainsState } from 'src/reducers/domains';


export function mapStateToProps({ domainsList, option, dog }: DomainsState) {
  return {
    domainsList,
    option,
    dog
  }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.DomainAction | actions.OptionAction>) {
  return {
    addDomain: (domainName: string, hideType: FULL_HIDE | PARTIAL_HIDE) => dispatch(actions.addDomain(domainName, hideType)),
    removeDomain: () => dispatch(actions.removeDomain()),
    fetchDomainsList: () => dispatch(actions.fetchDomainsList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

