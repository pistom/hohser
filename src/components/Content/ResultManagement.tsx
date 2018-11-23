import * as React from "react";
import Arrow from '@material-ui/icons/KeyboardArrowDown';
import FavoriteBorderIcon from '@material-ui/icons/Favorite';
import OffIcon from '@material-ui/icons/VisibilityOff';
import BlockIcon from '@material-ui/icons/Opacity';
import { IconButton } from '@material-ui/core';
import { FULL_HIDE, PARTIAL_HIDE, HIGHLIGHT, COLOR_1, COLOR_2, COLOR_3 } from 'src/constants';

interface Props {
  result: HTMLElement;
  url: string;
  storageManager: any;
}

export const ResultManagement = (props: Props) => {

  let url = props.url.split(" ")[0];
  let domainName = `¯\_(ツ)_/¯`;
  if (!/^https?:\/\//i.test(url)) {
    url = 'http://' + url;
  }
  try {
    domainName = (new URL(url)).hostname;
  } catch (e) {}

  return (
    <div>
      <Arrow />
      <div className="hohser_actions">
        <p className="hohser_actions_domain">{domainName}</p>
        <div className="hohser_actions_btns">
          <IconButton data-domain={domainName} data-action={FULL_HIDE}>
            <OffIcon fontSize="small" />
          </IconButton>
          <IconButton data-domain={domainName} data-action={PARTIAL_HIDE}>
            <BlockIcon fontSize="small" />
          </IconButton>
          <IconButton data-domain={domainName} data-action={HIGHLIGHT} data-color={COLOR_1}>
            <FavoriteBorderIcon style={{color: "#f50057"}} fontSize="small" />
          </IconButton>
          <IconButton data-domain={domainName} data-action={HIGHLIGHT} data-color={COLOR_2}>
            <FavoriteBorderIcon style={{color: "#8BC34A"}} fontSize="small" />
          </IconButton>
          <IconButton data-domain={domainName} data-action={HIGHLIGHT} data-color={COLOR_3}>
            <FavoriteBorderIcon style={{color: "#03A9F4"}} fontSize="small" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
