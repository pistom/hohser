import * as React from 'react';
import { IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Divider, withStyles } from '@material-ui/core';
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
    opacity: 0
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
        return([
        <ListItem
          style={{maxHeight: 50, transition: "all .25s"}}
          key='entry'
          button
          onClick={() => props.editDomainHandle(i)}
          className={hiddenClass}
        >
          <ListItemText primary={props.domainsList[item].domainName} />
          <ListItemSecondaryAction className={hiddenClass}>
            {props.domainsList[item].display === HIGHLIGHT ?
              <IconButton disabled>
                <FavoriteBorderIcon style={{color: `${domainColors[props.domainsList[item].color] || domainColors.COLOR_0}`}} />
              </IconButton> : null
            }
            {props.domainsList[item].display === PARTIAL_HIDE ?
              <IconButton disabled>
                <BlockIcon />
              </IconButton> : null
            }
            {props.domainsList[item].display === FULL_HIDE ?
              <IconButton disabled>
                <OffIcon />
              </IconButton> : null
            }
            <IconButton aria-label="Delete" onClick={() => props.removeDomainHandle(i)} className={hiddenClass}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>,
        <div key='divider' className={hiddenClass}>{arr.length !== i + 1 ? <Divider /> : null}</div> // Do not display for last record
      ]);})}
    </List>
  );
};

export default withStyles(styles)(DomainsList);
