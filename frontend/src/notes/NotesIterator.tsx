import { Box } from "@mui/material";
import { useListContext } from "react-admin";

import { NewNote } from "./NewNote";
import { Note } from "./Note";

export const NotesIterator = ({
  showStatus,
  reference,
}: {
  showStatus?: boolean;
  reference: "contacts" | "deals";
}) => {
  const { data, isLoading } = useListContext();
  if (isLoading) return null;
  return (
    <>
      <NewNote showStatus={showStatus} reference={reference} />
      <Box mt="0.5em">
        {data.map((note, index) => (
          <Note
            note={note}
            isLast={index === data.length - 1}
            showStatus={showStatus}
            reference={reference}
            key={index}
          />
        ))}
      </Box>
    </>
  );
};
