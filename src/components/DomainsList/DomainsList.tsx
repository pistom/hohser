import * as React from 'react';
import { IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Domain } from 'src/types';

interface Props {
  domainsList: Array<Domain>;
}


const DomainsList = (props: Props) => {
  return (
    <List style={{paddingTop: 64, paddingBottom: 124}}>
      {Object.keys(props.domainsList).map((item, i) => (
        <ListItem button>
          <ListItemText primary={props.domainsList[item].domainName} />
          <ListItemSecondaryAction>
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default (DomainsList);




// {
//   Object.keys(this.props.domainsList).map((item, i) => (
//     <li key={i}>
//       {this.props.domainsList[item].domainName} -
//         {this.props.domainsList[item].display ? <span>{this.props.domainsList[item].display}</span> : null} -
//         {this.props.domainsList[item].color ? <span>{this.props.domainsList[item].color}</span> : null} -
//         <span onClick={() => this.removeDomainHandle(i)}>❌</span>
//     </li>
//   ))
// }
