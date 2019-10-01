import * as React from "react";
import { DomainsCounters } from '../../types';

interface Props {
  domainsCounters: DomainsCounters;
}

export const DomainsCounter = (props: Props) => {

  return (
    <React.Fragment>
      Hidden domains: {props.domainsCounters.fullHide}
    </React.Fragment>
  );
};
