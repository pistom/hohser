import * as React from 'react';
import { withStyles } from 'tss-react/mui';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/Favorite';
import WarningIcon from '@mui/icons-material/Warning';
import OffIcon from '@mui/icons-material/VisibilityOff';
import BlockIcon from '@mui/icons-material/Opacity';
import { Domain } from '../../types';
import { HIGHLIGHT, PARTIAL_HIDE, FULL_HIDE } from '../../constants';

const styles = {
  entry: {
    maxHeight: 70,
    transition: "all .25s",
    fontFamily: 'Sans-Serif',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #ccc'
  },
  domain: {
    cursor: 'pointer',
    padding: 16,
    color: '#444',
    flexGrow: 3,
    overflow: 'hidden'
  },
  icons: {
    padding: "12px 16px 12px 0",
    color: '#888',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  labels: {
    display: 'flex',
    padding: "16px 0",
    alignItems: 'center'
  },
  label: {
    height: 16,
    width: 16,
    borderRadius: 16
  },
  delete: {
    padding: '0 10px',
    fontWeigth: 'bold',
    color: '#aaa'
  },
  rainbow: {
    backgroundImage: 'linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red)',
    color: 'transparent',
    borderRadius: 15
  },
};

interface Props {
  domainsList: Array<Domain>;
  highlightColors: Array<string>;
  removeDomainHandle: (domainName: string) => void;
  editDomainHandle: (index: number) => void;
  openSearch: () => void;
  searchedPhrase: string;
  classes?: Partial<Record<keyof typeof styles, string>>;
}

interface State {
  showList: boolean;
}

class DomainsList extends React.Component<Props, State> {

  // TODO Make colors as variables
  domainColors = {
    COLOR_0 :"#aaaaaa",
    COLOR_1 :"#f50057",
    COLOR_2 :"#8BC34A",
    COLOR_3 :"#03A9F4",
  };

  constructor (props: any) {
    super(props);
    this.state = {
      showList: false
    };
  }

  handleShowList () {
    this.setState({showList: true});
  }

  componentDidMount (): void {
    this.props.highlightColors?.forEach( (color, i) => {
      this.domainColors['COLOR_' + (i+4)] = `#${color}`;
    });
  }

  componentWillReceiveProps (nextProps: any): void {
    if (this.props?.highlightColors?.length !== nextProps.highlightColors?.length) {
      nextProps.highlightColors?.forEach( (color: string, i: number) => {
        this.domainColors['COLOR_' + (i+4)] = `#${color}`;
      });
    }
  }

  render () {
    const classes = withStyles.getClasses(this.props);
    return (
    <List style={{ position: "absolute", top: 54, bottom: 116, overflowY: "scroll", overflowX: "hidden", width: "100%" }}>
      {this.props.domainsList.length < 100 || this.state.showList || this.props.searchedPhrase.length >= 3 ?
        Object.keys(this.props.domainsList)
          .filter(item => this.props.domainsList[item].domainName && this.props.domainsList[item].domainName.includes(this.props.searchedPhrase))
          .map((item, i, arr) =>
            <li key={`item_${i.toString()}`} className={classes.entry} style={{borderBottom: arr.length === i + 1 ? "none" : ""}} >
              <span className={classes.domain} onClick={() => this.props.editDomainHandle(i)} style={{wordWrap: "break-word"}}>
                {this.props.domainsList[item].domainName}
              </span>
              {arr.length < 100 ? // Remplace icon with spans if list too long
                <span className={classes.icons} >
                  {this.props.domainsList[item].display === HIGHLIGHT ?
                    (this.domainColors[this.props.domainsList[item]?.color] ?
                      <FavoriteBorderIcon
                        style={{color: this.domainColors[this.props.domainsList[item]?.color].includes('super') ? undefined : `${this.domainColors[this.props.domainsList[item].color]}`}}
                        className={ this.domainColors[this.props.domainsList[item]?.color].includes('super') ? this.props.classes.rainbow : '' } /> :
                      <Tooltip title={`${this.props.domainsList[item].color} is not defined. Go to Settings: Edit custom colors.`}>
                        <WarningIcon style={{color: `this.domainColors.COLOR_0}`}} />
                      </Tooltip>
                      ) : null
                  }
                  {this.props.domainsList[item].display === PARTIAL_HIDE ?
                    <BlockIcon /> : null
                  }
                  {this.props.domainsList[item].display === FULL_HIDE ?
                    <OffIcon /> : null
                  }
                  <DeleteIcon onClick={() => this.props.removeDomainHandle(this.props.domainsList[item].domainName)} style={{cursor: 'pointer'}} />
                </span> :
                <span className={classes.labels}>
                  {this.props.domainsList[item].display === HIGHLIGHT ?
                    <span className={classes.label} style={{backgroundColor: `${this.domainColors[this.props.domainsList[item].color] || this.domainColors.COLOR_0}`}} /> : null
                  }
                  {this.props.domainsList[item].display === PARTIAL_HIDE ?
                    <span className={classes.label}  style={{backgroundColor: "#aaa"}}/> : null
                  }
                  {this.props.domainsList[item].display === FULL_HIDE ?
                    <span className={classes.label}  style={{backgroundColor: "none", border: '1px solid #aaa'}}/> : null
                  }
                  <span className={classes.delete} onClick={() => this.props.removeDomainHandle(this.props.domainsList[item].domainName)} style={{cursor: 'pointer'}} >×</span>
                </span>
              }
            </li>
        ) :
        <div style={{textAlign: 'center'}}>
          <Badge style={{marginTop: 16}} badgeContent={this.props.domainsList.length} color="secondary" max={9999}>
            <Typography variant="subtitle1">The list contains more than 100 entries</Typography>
          </Badge>
          <Button variant="contained" color="primary" size="small" onClick={() => this.props.openSearch()}>Search for an entry</Button>&nbsp;
          <Button variant="contained" color="secondary" size="small" onClick={() => this.handleShowList()}>Show all entries</Button>
        </div>
      }
    </List>
    );
  }
}

export default withStyles(DomainsList, styles);
