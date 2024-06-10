import { Box } from "@mui/material";
import { useRecordContext } from "react-admin";

import { Companies } from "../generated/client";
import useImageSource from "../misc/ImageSource";

const sizeInPixel = {
  medium: 42,
  small: 20,
};

export const LogoField = ({
  size = "medium",
}: {
  size?: "small" | "medium";
}) => {
  const record = useRecordContext<Companies>();
  const logoSrc = useImageSource(record);
  if (!record) return null;
  return (
    <Box
      component="img"
      src={logoSrc}
      alt={record.name}
      title={record.name}
      width={sizeInPixel[size]}
      height={sizeInPixel[size]}
      sx={{ objectFit: "contain" }}
    />
  );
};
