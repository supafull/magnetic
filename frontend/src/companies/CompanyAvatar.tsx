import { Avatar } from "@mui/material";
import { useRecordContext } from "react-admin";
import { Companies } from "../generated/client";
import useImageSource from "../misc/ImageSource";

export const CompanyAvatar = (props: {
  record?: Companies;
  size?: "small" | "large";
}) => {
  const { size = "large" } = props;
  const record = useRecordContext<Companies>(props);
  const logoSrc = useImageSource(record);

  if (!record) return null;
  return (
    <Avatar
      src={logoSrc}
      alt={record.name}
      sx={{
        bgcolor: "aliceblue",
        "& img": { objectFit: "contain" },
      }}
      imgProps={{ className: size }}
    />
  );
};
