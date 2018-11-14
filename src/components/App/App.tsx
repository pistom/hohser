import { Domain, DisplayStyle } from 'src/types';
import * as React from 'react';
// import AddDomain from '../AddDomain/AddDomain';
import { CssBaseline } from '@material-ui/core';

import TopBar from '../TopBar/TopBar';
import BottomBar from '../BottomBar/BottomBar';
import DomainsList from '../DomainsList/DomainsList';

export interface Props {
  domainsList: Array<Domain>;
  domainsListLoading: boolean;
  addDomain: (domainName: string, display: DisplayStyle) => void;
  removeDomain: (index: number) => void;
  fetchDomainsList: () => void;
  importFromOldVersion: () => void;
}

class App extends React.Component<Props> {
  constructor (props: Props) {
    super(props);
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

  public render () {
    return [
      <CssBaseline />,
      <TopBar />,
      <DomainsList domainsList={this.props.domainsList} removeDomainHandle={(i) => this.removeDomainHandle(i)} />,
      <BottomBar addDomain={this.props.addDomain} />
    ];
  }
}

export default App;
