import * as React from 'react';
import { List, withStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteBorderIcon from '@material-ui/icons/Favorite';
import OffIcon from '@material-ui/icons/VisibilityOff';
import BlockIcon from '@material-ui/icons/Opacity';
import { Domain } from 'src/types';
import { HIGHLIGHT, PARTIAL_HIDE, FULL_HIDE } from 'src/constants';

interface Props {
  domainsList: Array<Domain>;
  removeDomainHandle: (index: number) => void;
  editDomainHandle: (index: number) => void;
  searchedPhrase: string;
  classes: any;
}

const styles = (theme: any) => ({
  hidden: {
    maxHeight: "0!important",
    paddingTop: 0,
    paddingBottom: 0,
    opacity: 0,
    borderBottom: 'none!important'
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

const DomainsList = (props: Props) => {

  // TODO Make colors as variables
  const domainColors = {
    COLOR_0 :"#ffffff",
    COLOR_1 :"#f50057",
    COLOR_2 :"#8BC34A",
    COLOR_3 :"#03A9F4",
  };

  const classes = props.classes;

  return (
    <List style={{ position: "absolute", top: 54, bottom: 116, overflowY: "scroll", overflowX: "hidden", width: "100%" }}>
      {Object.keys(props.domainsList).map((item, i, arr) => {
        const hiddenClass=props.searchedPhrase && !props.domainsList[item].domainName.includes(props.searchedPhrase) ? classes.hidden : '';
        return(
        <li
          key='entry'
          className={hiddenClass}
          style={{
            maxHeight: 70,
            transition: "all .25s",
            borderBottom: arr.length !== i + 1 ? "1px solid #ccc" : "none",
            fontFamily: 'Sans-Serif',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <span className={classes.domain} onClick={() => props.editDomainHandle(i)} style={{wordWrap: "break-word"}}>
            {props.domainsList[item].domainName}
          </span>
          {arr.length < 100 ?
            <span className={classes.icons} >
              {props.domainsList[item].display === HIGHLIGHT ?
                <FavoriteBorderIcon style={{color: `${domainColors[props.domainsList[item].color] || domainColors.COLOR_0}`}} /> : null
              }
              {props.domainsList[item].display === PARTIAL_HIDE ?
                <BlockIcon /> : null
              }
              {props.domainsList[item].display === FULL_HIDE ?
                <OffIcon /> : null
              }
              <DeleteIcon onClick={() => props.removeDomainHandle(i)} style={{cursor: 'pointer'}} />
            </span> :
            <span className={classes.labels}>
              {props.domainsList[item].display === HIGHLIGHT ?
                <span className={classes.label} style={{backgroundColor: `${domainColors[props.domainsList[item].color] || domainColors.COLOR_0}`}} /> : null
              }
              {props.domainsList[item].display === PARTIAL_HIDE ?
                <span className={classes.label}  style={{backgroundColor: "#aaa"}}/> : null
              }
              {props.domainsList[item].display === FULL_HIDE ?
                <span className={classes.label}  style={{backgroundColor: "none", border: '1px solid #aaa'}}/> : null
              }
              <span className={classes.delete} onClick={() => props.removeDomainHandle(i)} style={{cursor: 'pointer'}} >×</span>
            </span>
          }
        </li>
      );})}
    </List>
  );
};

export default withStyles(styles)(DomainsList);
