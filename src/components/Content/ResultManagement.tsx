import * as React from "react";
import Arrow from '@material-ui/icons/KeyboardArrowDown';

interface Props {
  result: HTMLElement;
  url: string;
}

export const ResultManagement = (props: Props) => {

  const domainName = (new URL(props.url)).hostname;

  return (
    <div>
      <span><Arrow /></span>
      <ul className="hohser_action_list">
        <li>{domainName}</li>
      </ul>
    </div>
  );
};
