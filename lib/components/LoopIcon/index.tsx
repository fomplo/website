import Icon from "@mui/icons-material/Loop";

export const LoopIcon = () => (
  <Icon
    sx={{
      animation: "spin 4s linear infinite",
      "@keyframes spin": {
        "0%": {
          transform: "rotate(360deg)",
        },
        "100%": {
          transform: "rotate(0deg)",
        },
      },
    }}
  />
);
