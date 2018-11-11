import { Domain, DisplayStyle } from 'src/types';
import * as React from 'react';
import AddDomain from '../AddDomain/AddDomain';

export interface Props {
  domainsList: Array<Domain>;
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

  removeDomainHandle (index: number) {
    this.props.removeDomain(index);
  }

  importFromOldVersionHandle () {
    this.props.importFromOldVersion();
  }

  public render () {
    return (
      <div>
        <AddDomain addDomain={this.props.addDomain} />
        {Object.keys(this.props.domainsList).map((item, i) => (
          <li key={i}>
            {this.props.domainsList[item].domainName} -
            {this.props.domainsList[item].display ? <span>{this.props.domainsList[item].display}</span> : null} -
            {this.props.domainsList[item].color ? <span>{this.props.domainsList[item].color}</span> : null} -
            <span onClick={() => this.removeDomainHandle(i)}>❌</span>
          </li>
        ))}
        <span onClick={() => this.importFromOldVersionHandle()}>import</span>
      </div>
    );
  }
}

export default App;
