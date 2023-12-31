import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface Props {
  title: string;
  value: string;
}

export const StatCard = ({ title, value }: Props) => {
  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
      <Typography color="textSecondary">{title}</Typography>

      <Typography variant="h6" fontWeight={700}>
        {value}
      </Typography>
    </Paper>
  );
};
