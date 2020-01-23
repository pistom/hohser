import * as React from "react";
import Arrow from '@material-ui/icons/KeyboardArrowDown';
import FavoriteBorderIcon from '@material-ui/icons/Favorite';
import OffIcon from '@material-ui/icons/VisibilityOff';
import BlockIcon from '@material-ui/icons/Opacity';
import DeleteIcon from '@material-ui/icons/RemoveCircle';
import { IconButton } from '@material-ui/core';
import { FULL_HIDE, PARTIAL_HIDE, HIGHLIGHT, COLOR_1, COLOR_2, COLOR_3, REMOVE_DOMAIN } from '../../constants';

interface Props {
  url: string;
}

export const getShortUrl = (u: string): string | null => {
  let url = u.split(" ")[0];
  let domainName: string | null = `¯\\_(ツ)_/¯`;
  if (!/^https?:\/\//i.test(url)) {
    url = 'http://' + url;
  }
  try {
    const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    domainName = matches && matches[1];
  } catch (e) {}
  return domainName;
};

export const ResultManagement = (props: Props): JSX.Element => {

  const domainName: string | null = getShortUrl(props.url);

  return (
    <div>
      <Arrow />
      <div className="hohser_actions">
        <p className="hohser_actions_domain">
          {domainName}
          <IconButton data-domain={domainName} data-action={REMOVE_DOMAIN}>
            <DeleteIcon />
          </IconButton>
        </p>
        <div className="hohser_actions_btns">
          <IconButton title="Hide" data-domain={domainName} data-action={FULL_HIDE}>
            <OffIcon fontSize="small" />
          </IconButton>
          <IconButton title="Transparent" data-domain={domainName} data-action={PARTIAL_HIDE}>
            <BlockIcon fontSize="small" />
          </IconButton>
          <IconButton title="Highlight (red)" data-domain={domainName} data-action={HIGHLIGHT} data-color={COLOR_1}>
            <FavoriteBorderIcon style={{color: "#f50057"}} fontSize="small" />
          </IconButton>
          <IconButton title="Highlight (green)" data-domain={domainName} data-action={HIGHLIGHT} data-color={COLOR_2}>
            <FavoriteBorderIcon style={{color: "#8BC34A"}} fontSize="small" />
          </IconButton>
          <IconButton title="Highlight (blue)" data-domain={domainName} data-action={HIGHLIGHT} data-color={COLOR_3}>
            <FavoriteBorderIcon style={{color: "#03A9F4"}} fontSize="small" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
