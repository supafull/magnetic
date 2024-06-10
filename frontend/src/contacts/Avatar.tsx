import { Avatar as MuiAvatar } from "@mui/material";
import { useRecordContext } from "react-admin";

import { Contacts } from "../generated/client";
import useImageSource from "../misc/ImageSource";

export const Avatar = (props: { record?: Contacts }) => {
  const record = useRecordContext<Contacts>(props);
  const logoSrc = useImageSource(record);
  if (!record) return null;

  return (
    <MuiAvatar src={logoSrc}>
      {record.first_name.charAt(0)}
      {record.last_name.charAt(0)}
    </MuiAvatar>
  );
};
