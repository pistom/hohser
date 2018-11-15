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
  editedDomain: number | null;
}

class App extends React.Component<Props, State> {

  constructor (props: Props) {
    super(props);
    this.state = {
      editedDomain: null
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
    this.setState({editedDomain: index});
  }

  closeEditionHandle () {
    this.setState({editedDomain: null});
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
        open={!!this.state.editedDomain}
        closeEditionHandle={() => this.closeEditionHandle()}
        domain={this.state.editedDomain !== null ? this.props.domainsList[this.state.editedDomain] : null}
      />,
      <BottomBar addDomain={this.props.addDomain} />
    ];
  }
}

export default App;
