import { DefaultContainer } from "@/lib/components/Cards/DefaultContainer";
import Skeleton from "@mui/material/Skeleton";

export const LoadingIndicator = () => (
  <DefaultContainer>
    <Skeleton
      variant="rectangular"
      width="100%"
      height={200}
      sx={{ borderRadius: 2 }}
    />
  </DefaultContainer>
);
