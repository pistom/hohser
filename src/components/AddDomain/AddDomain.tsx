import * as React from 'react';
import { FULL_HIDE, PARTIAL_HIDE } from 'src/constants';
import { HideStyle } from 'src/types';

interface State {
  domainName: string;
  fullHide: boolean;
}

interface Props {
  addDomain: (domainName: string, hideType: HideStyle) => void;
}

class AddDomain extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      domainName: '',
      fullHide: false
    };

    this.handleDomainNameChange = this.handleDomainNameChange.bind(this);
    this.handleHideStyleChange = this.handleHideStyleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDomainNameChange(event: any) {
    this.setState({domainName: event.target.value});
  }

  handleHideStyleChange(event: any) {
    this.setState({fullHide: event.target.checked});
  }

  handleSubmit(event: any) {
    event.preventDefault();
    let hideStyle: HideStyle = PARTIAL_HIDE;
    if(this.state.fullHide) {
      hideStyle = FULL_HIDE;
    }
    this.props.addDomain(this.state.domainName, hideStyle);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          name="domainName" 
          type="text"
          value={this.state.domainName}
          onChange={this.handleDomainNameChange} />
        <input
          name="fullHide"
          type="checkbox"
          checked={this.state.fullHide}
          onChange={this.handleHideStyleChange}
        />
        <button type="submit">+</button>
      </form>
    )
  }


}

export default AddDomain;
