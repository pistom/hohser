import { Domain, DisplayStyle, Color } from '../../types';
import * as React from 'react';
// import AddDomain from '../AddDomain/AddDomain';
import CssBaseline from '@material-ui/core/CssBaseline';

import TopBar from '../TopBar/TopBar';
import BottomBar from '../BottomBar/BottomBar';
import DomainsList from '../DomainsList/DomainsList';
import EditDomain from '../EditDomain/EditDomain';
import Drawer from '../SideMenu/Drawer';
import SnackBar from './SnackBar';
import SearchBox from '../SearchBox/SearchBox';

export interface Props {
  domainsList: Array<Domain>;
  domainsListLoading: boolean;
  options: any;
  currentTabUrl: string | null;
  addDomain: (domainName: string, display: DisplayStyle, color?: Color) => void;
  editDomain: (index: number, domainName: string, display: DisplayStyle, color?: Color) => void;
  removeDomain: (domainName: string) => void;
  clearDomainList: () => void;
  importDomains: (domainsList: Domain[]) => void;
  fetchDomainsList: () => void;
  fetchOptions: () => void;
  getCurrentUrl: () => void;
  toggleShowAll: () => void;
  toggleForceColors: () => void;
  setPartialHideOpacity: (opacity: number) => void;
  toggleShowCounter: () => void;
  toggleLocalStorage: () => void;
  importFromOldVersion: () => void;
  updateHighlightCustomColors: (colors: string[]) => void;
}

interface State {
  editedDomain: number | null;
  drawerIsOpen: boolean;
  searchIsOpen: boolean;
  searchedPhrase: string;
}

class App extends React.Component<Props, State> {

  constructor (props: Props) {
    super(props);
    this.state = {
      editedDomain: null,
      drawerIsOpen: false,
      searchIsOpen: false,
      searchedPhrase: ''
    };
    this.handleOnChangeSearchTextField = this.handleOnChangeSearchTextField.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.toggleLocalStorage = this.toggleLocalStorage.bind(this);
  }

  componentDidMount () {
    this.props.fetchDomainsList();
    this.props.fetchOptions();
    this.props.getCurrentUrl();
  }

  componentWillUpdate (nextProps: Props) {
    if (this.props.domainsListLoading && !nextProps.domainsListLoading) {
      this.props.importFromOldVersion();
    }
  }

  handleRemoveDomain (domainName: string) {
    this.props.removeDomain(domainName);
  }

  editDomainHandle (index: number) {
    this.setState({editedDomain: index});
  }

  closeEditionHandle () {
    this.setState({editedDomain: null});
  }

  toggleDrawer () {
    this.setState({
      drawerIsOpen: !this.state.drawerIsOpen
    });
  }

  toggleSearch (): void {
    this.setState({
      searchIsOpen: !this.state.searchIsOpen
    });
  }

  toggleShowAll (): void {
    this.props.toggleShowAll();
  }

  toggleForceColors (): void {
    this.props.toggleForceColors();
  }

  setPartialHideOpacity (opacity: number): void {
    this.props.setPartialHideOpacity(opacity);
  }

  toggleShowCounter (): void {
    this.props.toggleShowCounter();
  }

  toggleLocalStorage (): void {
    this.props.toggleLocalStorage();
  }

  updateHighlightCustomColors (colors: string[]): void {
    this.props.updateHighlightCustomColors(colors);
  }

  handleOnChangeSearchTextField (e: any): void {
    this.setState({searchedPhrase: e.target.value});
  }

  public render () {
    return [
      <CssBaseline />,
      <TopBar
        toggleDrawer={() => this.toggleDrawer()}
        toggleSearch={this.toggleSearch}
      />,
      <SnackBar
        options={this.props.options}
        toggleShowAll={() => this.toggleShowAll()}
      />,
      <Drawer
        open={this.state.drawerIsOpen}
        toggle={() => this.toggleDrawer()}
        toggleShowAll={() => this.toggleShowAll()}
        toggleForceColors={() => this.toggleForceColors()}
        setPartialHideOpacity={opacity => this.setPartialHideOpacity(opacity)}
        toggleShowCounter={() => this.toggleShowCounter()}
        updateHighlightCustomColors={(colors: string[]) => this.updateHighlightCustomColors(colors)}
        toggleLocalStorage={this.toggleLocalStorage}
        options={this.props.options}
        addDomain={this.props.addDomain}
        clearDomainList={this.props.clearDomainList}
        domainsList={this.props.domainsList}
        importDomains={this.props.importDomains}
      />,
      <SearchBox
        open={this.state.searchIsOpen}
        toggle={() => this.toggleSearch()}
        onChangeSearchTextField={this.handleOnChangeSearchTextField}
        value={this.state.searchedPhrase}
      />,
      <DomainsList
        domainsList={this.props.domainsList}
        highlightColors={this.props.options.highlightColors}
        removeDomainHandle={(domainName: string) => this.handleRemoveDomain(domainName)}
        editDomainHandle={(i: any) => this.editDomainHandle(i)}
        searchedPhrase={this.state.searchedPhrase}
        openSearch={() => this.toggleSearch()}
      />,
      <EditDomain
        open={this.state.editedDomain}
        closeEditionHandle={() => this.closeEditionHandle()}
        domain={this.state.editedDomain !== null ? this.props.domainsList[this.state.editedDomain] : null}
        editDomain={(index: number, domainName: string, display: DisplayStyle, color?: Color) => this.props.editDomain(index, domainName, display, color)}
        options={this.props.options}
      />,
      <BottomBar
        addDomain={this.props.addDomain}
        options={this.props.options}
        currentTabUrl={this.props.currentTabUrl} />
    ];
  }
}

export default App;
