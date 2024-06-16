import { Box, Card, CardContent, Typography } from "@mui/material";
import {
  ReferenceField,
  ReferenceManyField,
  ShowBase,
  TextField,
  useShowContext,
} from "react-admin";

import { LogoField } from "../companies/LogoField";
import { Contacts } from "../generated/client";
import { NotesIterator } from "../notes";
import { Avatar } from "./Avatar";
import { ContactAside } from "./ContactAside";

export const ContactShow = () => (
  <ShowBase>
    <ContactShowContent />
  </ShowBase>
);

const ContactShowContent = () => {
  const { record, isLoading } = useShowContext<Contacts>();
  if (isLoading || !record) return null;
  return (
    <Box mt={2} display="flex">
      <Box flex="1">
        <Card>
          <CardContent>
            <Box display="flex">
              <Avatar />
              <Box ml={2} flex="1">
                <Typography variant="h5">
                  {record.first_name} {record.last_name}
                </Typography>
                <Typography variant="body2">
                  {record.title} at{" "}
                  <ReferenceField
                    source="company_id"
                    reference="companies"
                    link="show"
                  >
                    <TextField source="name" />
                  </ReferenceField>
                </Typography>
              </Box>
              <Box>
                <ReferenceField
                  source="company_id"
                  reference="companies"
                  link="show"
                >
                  <LogoField />
                </ReferenceField>
              </Box>
            </Box>
            <ReferenceManyField
              target="contact_id"
              reference="contactNotes"
              sort={{ field: "date", order: "DESC" }}
            >
              <NotesIterator showStatus reference="contacts" />
            </ReferenceManyField>
          </CardContent>
        </Card>
      </Box>
      <ContactAside />
    </Box>
  );
};
