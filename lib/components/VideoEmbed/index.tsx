import { DefaultContainer } from "@/lib/components/Cards/DefaultContainer";

import Link from "next/link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import YouTubeIcon from "@mui/icons-material/YouTube";

interface Props {
  href: string;
  imgSrc: string;
}

export const VideoEmbed = ({ href, imgSrc }: Props) => (
  <DefaultContainer>
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      gap={1}
      mx="auto"
      mb={2}
    >
      <YouTubeIcon sx={{ color: "red" }} />

      <Typography fontWeight={700} color="textSecondary" align="center">
        Watch the videotutorial
      </Typography>
    </Stack>

    <Link href={href} target="_blank" passHref>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Videotutorial"
        src={imgSrc}
        style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 8 }}
      />
    </Link>
  </DefaultContainer>
);
