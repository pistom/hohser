import * as React from 'react';
import { FULL_HIDE, PARTIAL_HIDE, COLOR_1, COLOR_2, COLOR_3 } from 'src/constants';
import { HideStyle, Color } from 'src/types';

interface State {
  domainName: string;
  fullHide: boolean;
  color: number;
}

interface Props {
  addDomain: (domainName: string, hideType: HideStyle, color?: Color) => void;
}

class AddDomain extends React.Component<Props, State> {
  constructor (props: any) {
    super(props);
    this.state = {
      domainName: '',
      fullHide: false,
      color: 0
    };

    this.handleDomainNameChange = this.handleDomainNameChange.bind(this);
    this.handleHideStyleChange = this.handleHideStyleChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDomainNameChange (event: any) {
    this.setState({domainName: event.target.value});
  }

  handleHideStyleChange (event: any) {
    this.setState({fullHide: event.target.checked});
  }

  handleColorChange (event: any) {
    this.setState({color: parseInt(event.target.value, 10)});
  }

  handleSubmit (event: any) {
    event.preventDefault();

    let hideStyle: HideStyle = PARTIAL_HIDE;
    if(this.state.fullHide) {
      hideStyle = FULL_HIDE;
    }

    let color: Color = COLOR_1;
    switch (this.state.color) {
      case 1: color = COLOR_1; break;
      case 2: color = COLOR_2; break;
      case 3: color = COLOR_3; break;
    }

    if(this.state.color === 0) {
      this.props.addDomain(this.state.domainName, hideStyle);
    } else {
      this.props.addDomain(this.state.domainName, hideStyle, color);
    }
  }

  render () {
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
        <select value={this.state.color} onChange={this.handleColorChange}>
          <option value="0">None</option>
          <option value="1">Color 1</option>
          <option value="2">Color 2</option>
          <option value="3">Color 3</option>
        </select>
        <button type="submit">+</button>
      </form>
    );
  }

}

export default AddDomain;
