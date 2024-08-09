import * as React from 'react';
import { withStyles } from 'tss-react/mui';
import type { Theme } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Options from './Options';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DisplayStyle, Color, Domain } from '../../types';

const styles = (theme: Theme) => ({
  root: {
    width: 300,
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(6),
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

interface Props {
  toggle: () => void;
  toggleShowAll: () => void;
  toggleForceColors: () => void;
  setPartialHideOpacity: (opacity: number) => void;
  toggleShowCounter: () => void;
  toggleLocalStorage: () => void;
  addDomain: (domainName: string, display: DisplayStyle, color?: Color) => void;
  clearDomainList: () => void;
  importDomains: (domainsList: Domain[]) => void;
  updateHighlightCustomColors: (colors: string[]) => void;
  classes?: Partial<Record<keyof ReturnType<typeof styles>, string>>;
  open: boolean;
  options: any;
  domainsList: Array<Domain>;
}

const Drawer = (props: Props) => {
  const classes = withStyles.getClasses(props);
  return (
    <SwipeableDrawer
      open={props.open}
      onClose={() => props.toggle()}
      onOpen={() => props.toggle()}
    >
      <div
        tabIndex={0}
        role="button"
        className={classes.root}
      >
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            onClick={() => props.toggle()}
            size="large">
            <ArrowBackIcon />
          </IconButton>
        </Toolbar>
        <Options
          options={props.options}
          toggleShowAll={() => props.toggleShowAll()}
          toggleForceColors={() => props.toggleForceColors()}
          setPartialHideOpacity={opacity => props.setPartialHideOpacity(opacity)}
          toggleShowCounter={() => props.toggleShowCounter()}
          toggleLocalStorage={props.toggleLocalStorage}
          updateHighlightCustomColors={props.updateHighlightCustomColors}
          addDomain={props.addDomain}
          domainsList={props.domainsList}
          clearDomainList={props.clearDomainList}
          importDomains={props.importDomains}
        />
      </div>
    </SwipeableDrawer>
  );
};

export default withStyles(Drawer, styles);
