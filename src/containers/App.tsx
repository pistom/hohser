import App from '../components/App/App';
import * as actions from '../actions/';
import { StoreState } from '../types/index';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { FULL_HIDE, PARTIAL_HIDE } from 'src/constants';


export function mapStateToProps({ domainsList, settings }: StoreState) {
  return {
    domainsList,
    settings
  }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.DomainAction>) {
  return {
    addDomain: (domainName: string, hideType: FULL_HIDE | PARTIAL_HIDE) => dispatch(actions.addDomain(domainName, hideType)),
    removeDomain: () => dispatch(actions.removeDomain()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

