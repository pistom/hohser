import { Domain, DisplayStyle } from 'src/types';
import * as React from 'react';
// import AddDomain from '../AddDomain/AddDomain';
import { CssBaseline } from '@material-ui/core';

import TopBar from '../TopBar/TopBar';
import BottomBar from '../BottomBar/BottomBar';
import DomainsList from '../DomainsList/DomainsList';
import EditDomain from '../EditDomain/EditDomain';

export interface Props {
  domainsList: Array<Domain>;
  domainsListLoading: boolean;
  addDomain: (domainName: string, display: DisplayStyle) => void;
  removeDomain: (index: number) => void;
  fetchDomainsList: () => void;
  importFromOldVersion: () => void;
}

interface State {
  open: boolean;
}

class App extends React.Component<Props, State> {

  constructor (props: Props) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentDidMount () {
    this.props.fetchDomainsList();
  }

  componentWillUpdate (nextProps: Props) {
    if (this.props.domainsListLoading && !nextProps.domainsListLoading) {
      this.props.importFromOldVersion();
    }
  }

  removeDomainHandle (index: number) {
    this.props.removeDomain(index);
  }

  editDomainHandle (index: number) {
    this.setState({open: true});
  }

  closeEditionHandle () {
    this.setState({open: false});
  }

  public render () {
    return [
      <CssBaseline />,
      <TopBar />,
      <DomainsList
        domainsList={this.props.domainsList}
        removeDomainHandle={(i) => this.removeDomainHandle(i)}
        editDomainHandle={(i) => this.editDomainHandle(i)}
      />,
      <EditDomain
        open={this.state.open}
        closeEditionHandle={() => this.closeEditionHandle()}
      />,
      <BottomBar addDomain={this.props.addDomain} />
    ];
  }
}

export default App;
