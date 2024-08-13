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
  showDeleteButton: boolean;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>, action: string, color: string | null, domain: string) => void;
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
  const handleClick = props.handleClick;

  return (
    <div>
      <Arrow className="hohser_menu_icon" />
      <div className="hohser_actions">
        <p className="hohser_actions_domain">
          {domainName}
          {props.showDeleteButton && <IconButton
            size="large"
            onClick={(e) => handleClick(e, REMOVE_DOMAIN, null, domainName)}
            >
            <DeleteIcon />
          </IconButton>}
        </p>
        <div className="hohser_actions_btns">
          <IconButton
            title="Hide"
            size="large"
            onClick={(e) => handleClick(e, FULL_HIDE, null, domainName)}
            >
            <OffIcon fontSize="small" />
          </IconButton>
          <IconButton
            title="Transparent"
            size="large"
            onClick={(e) => handleClick(e, PARTIAL_HIDE, null, domainName)}
            >
            <BlockIcon fontSize="small" />
          </IconButton>
          <IconButton
            title="Highlight (red)"
            size="large"
            onClick={(e) => handleClick(e, HIGHLIGHT, COLOR_1, domainName)}
            >
            <FavoriteBorderIcon style={{color: "#f50057"}} fontSize="small" />
          </IconButton>
          <IconButton
            title="Highlight (green)"
            size="large"
            onClick={(e) => handleClick(e, HIGHLIGHT, COLOR_2, domainName)}
            >
            <FavoriteBorderIcon style={{color: "#8BC34A"}} fontSize="small" />
          </IconButton>
          <IconButton
            title="Highlight (blue)"
            size="large"
            onClick={(e) => handleClick(e, HIGHLIGHT, COLOR_3, domainName)}
            >
            <FavoriteBorderIcon style={{color: "#03A9F4"}} fontSize="small" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
