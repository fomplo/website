import { currencies } from "@/lib/utils/currencies";

import Avatar from "@mui/material/Avatar";
import HelpIcon from "@mui/icons-material/Help";
import Paper from "@mui/material/Paper";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

interface Props {
  symbol: string;
  onClick: () => void;
}

const RecentOptionCard = ({ symbol, onClick }: Props) => {
  return (
    <ButtonBase
      sx={{ width: "100%", height: "100%", borderRadius: 1 }}
      onClick={onClick}
    >
      <Paper
        variant="outlined"
        sx={{
          width: "100%",
          height: "100%",
          px: 1,
          py: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          src={`/assets/crypto/${symbol}.png`}
          sx={{ width: 32, height: 32, mb: 1 }}
        >
          <HelpIcon />
        </Avatar>

        <Typography
          align="center"
          fontWeight={700}
          sx={{ width: "100%", fontSize: 13 }}
        >
          {
            // @ts-ignore
            currencies[symbol]
          }
        </Typography>

        <Typography
          align="center"
          color="textSecondary"
          sx={{ width: "100%", fontSize: 13 }}
        >
          {symbol}
        </Typography>
      </Paper>
    </ButtonBase>
  );
};

export default RecentOptionCard;
