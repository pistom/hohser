import * as React from 'react';
import { IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Divider } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Domain } from 'src/types';

interface Props {
  domainsList: Array<Domain>;
  removeDomainHandle: (index: number) => void;
  editDomainHandle: (index: number) => void;
}

const DomainsList = (props: Props) => {
  return (
    <List style={{ position: "absolute", top: 54, bottom: 116, overflowY: "scroll", overflowX: "hidden", width: "100%" }}>
      {Object.keys(props.domainsList).map((item, i, arr) => ([
        <ListItem button onClick={() => props.editDomainHandle(i)}>
          <ListItemText primary={props.domainsList[item].domainName} />
          <ListItemSecondaryAction>
            <IconButton aria-label="Delete" onClick={() => props.removeDomainHandle(i)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>,
        <div>{arr.length !== i + 1 ? <Divider /> : null}</div>
      ]))}
    </List>
  );
};

export default (DomainsList);
