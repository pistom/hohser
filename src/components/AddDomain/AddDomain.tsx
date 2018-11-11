import * as React from 'react';
import { HIGHLIGHT, FULL_HIDE, PARTIAL_HIDE, COLOR_1, COLOR_2, COLOR_3 } from 'src/constants';
import { DisplayStyle, Color } from 'src/types';

interface State {
  domainName: string;
  fullHide: boolean;
  color: number;
  display: number;
}

interface Props {
  addDomain: (domainName: string, hideType: DisplayStyle, color?: Color) => void;
}

class AddDomain extends React.Component<Props, State> {
  constructor (props: any) {
    super(props);
    this.state = {
      domainName: '',
      fullHide: false,
      color: 0,
      display: 0
    };

    this.handleDomainNameChange = this.handleDomainNameChange.bind(this);
    this.handleDisplayChange = this.handleDisplayChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDomainNameChange (event: any) {
    this.setState({domainName: event.target.value});
  }

  handleDisplayChange (event: any) {
    this.setState({display: parseInt(event.target.value, 10)});
  }

  handleColorChange (event: any) {
    this.setState({color: parseInt(event.target.value, 10)});
  }

  handleSubmit (event: any) {
    event.preventDefault();

    let display: DisplayStyle = PARTIAL_HIDE;
    switch (this.state.display) {
      case 1: display = HIGHLIGHT; break;
      case 2: display = PARTIAL_HIDE; break;
      case 3: display = FULL_HIDE; break;
    }

    let color: Color = COLOR_1;
    switch (this.state.color) {
      case 1: color = COLOR_1; break;
      case 2: color = COLOR_2; break;
      case 3: color = COLOR_3; break;
    }

    if(this.state.color === 0) {
      this.props.addDomain(this.state.domainName, display);
    } else {
      this.props.addDomain(this.state.domainName, display, color);
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
        <select name="display" value={this.state.display} onChange={this.handleDisplayChange}>
          <option value="1">Highlighted</option>
          <option value="2">Transparent</option>
          <option value="3">Hidden</option>
        </select>
        <select name="color" value={this.state.color} onChange={this.handleColorChange}>
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
