import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import HelpIcon from "@mui/icons-material/Help";

interface Props {
  symbol: string;
  name: string;
  onClick: () => void;
}

const CurrencyCard = ({ symbol, name, onClick }: Props) => {
  return (
    <ListItem disablePadding sx={{ borderRadius: 2, overflow: "hidden" }}>
      <ListItemButton onClick={onClick}>
        <ListItemAvatar>
          <Avatar
            src={`/assets/crypto/${symbol}.png`}
            sx={{ border: 1, borderColor: "divider" }}
          >
            <HelpIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} secondary={symbol} />
      </ListItemButton>
    </ListItem>
  );
};

export default CurrencyCard;
