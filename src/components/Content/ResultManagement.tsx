import * as React from "react";
import Arrow from '@mui/icons-material/KeyboardArrowDown';
import FavoriteBorderIcon from '@mui/icons-material/Favorite';
import OffIcon from '@mui/icons-material/VisibilityOff';
import BlockIcon from '@mui/icons-material/Opacity';
import DeleteIcon from '@mui/icons-material/RemoveCircle';
import IconButton from '@mui/material/IconButton';
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
          <IconButton data-domain={domainName} data-action={REMOVE_DOMAIN} size="large">
            <DeleteIcon />
          </IconButton>
        </p>
        <div className="hohser_actions_btns">
          <IconButton
            title="Hide"
            data-domain={domainName}
            data-action={FULL_HIDE}
            size="large">
            <OffIcon fontSize="small" />
          </IconButton>
          <IconButton
            title="Transparent"
            data-domain={domainName}
            data-action={PARTIAL_HIDE}
            size="large">
            <BlockIcon fontSize="small" />
          </IconButton>
          <IconButton
            title="Highlight (red)"
            data-domain={domainName}
            data-action={HIGHLIGHT}
            data-color={COLOR_1}
            size="large">
            <FavoriteBorderIcon style={{color: "#f50057"}} fontSize="small" />
          </IconButton>
          <IconButton
            title="Highlight (green)"
            data-domain={domainName}
            data-action={HIGHLIGHT}
            data-color={COLOR_2}
            size="large">
            <FavoriteBorderIcon style={{color: "#8BC34A"}} fontSize="small" />
          </IconButton>
          <IconButton
            title="Highlight (blue)"
            data-domain={domainName}
            data-action={HIGHLIGHT}
            data-color={COLOR_3}
            size="large">
            <FavoriteBorderIcon style={{color: "#03A9F4"}} fontSize="small" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
