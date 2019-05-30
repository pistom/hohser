import * as React from 'react';
import { List, withStyles, Button, Typography, Badge } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteBorderIcon from '@material-ui/icons/Favorite';
import OffIcon from '@material-ui/icons/VisibilityOff';
import BlockIcon from '@material-ui/icons/Opacity';
import { Domain } from 'src/types';
import { HIGHLIGHT, PARTIAL_HIDE, FULL_HIDE } from 'src/constants';

interface Props {
  domainsList: Array<Domain>;
  removeDomainHandle: (domainName: string) => void;
  editDomainHandle: (index: number) => void;
  openSearch: () => void;
  searchedPhrase: string;
  classes: any;
}

interface State {
  showList: boolean;
}

const styles = (theme: any) => ({
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
  }
});

class DomainsList extends React.Component<Props, State> {

  // TODO Make colors as variables
  domainColors = {
    COLOR_0 :"#ffffff",
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

  public handleShowList () {
    this.setState({showList: true});
  }

  render () {
    const classes = this.props.classes;
    return (
    <List style={{ position: "absolute", top: 54, bottom: 116, overflowY: "scroll", overflowX: "hidden", width: "100%" }}>
      {this.props.domainsList.length < 100 || this.state.showList || this.props.searchedPhrase.length >= 3 ?
        Object.keys(this.props.domainsList)
          .filter(item => this.props.domainsList[item].domainName.includes(this.props.searchedPhrase))
          .map((item, i, arr) =>
            <li key={`item_${i.toString()}`} className={classes.entry} style={{borderBottom: arr.length === i + 1 ? "none" : ""}} >
              <span className={classes.domain} onClick={() => this.props.editDomainHandle(i)} style={{wordWrap: "break-word"}}>
                {this.props.domainsList[item].domainName}
              </span>
              {arr.length < 100 ? // Remplace icon with spans if list too long
                <span className={classes.icons} >
                  {this.props.domainsList[item].display === HIGHLIGHT ?
                    <FavoriteBorderIcon style={{color: `${this.domainColors[this.props.domainsList[item].color] || this.domainColors.COLOR_0}`}} /> : null
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

export default withStyles(styles)(DomainsList);
