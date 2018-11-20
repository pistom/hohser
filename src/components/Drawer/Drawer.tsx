import * as React from 'react';
import { SwipeableDrawer } from '@material-ui/core';

interface Props {
  toggle: () => void;
  open: boolean;
}

const Drawer = (props: Props) => {
  return(
    <SwipeableDrawer
          open={props.open}
          onClose={() => props.toggle()}
          onOpen={() => props.toggle()}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={() => props.toggle()}
            onKeyDown={() => props.toggle()}
            style={{width: 200}}
          >
            
          </div>
        </SwipeableDrawer>
  );
};

export default (Drawer);
