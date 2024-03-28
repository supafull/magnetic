import { Avatar, Box, Card, CardContent } from "@mui/material";
import { CreateBase, Form, Toolbar, useGetIdentity } from "react-admin";

import { Contact } from "../types";
import { ContactInputs } from "./ContactInputs";

export const ContactCreate = () => {
  const { identity } = useGetIdentity();
  return (
    <CreateBase
      redirect="show"
      transform={(data: Contact) => ({
        ...data,
        last_seen: new Date(),
        first_seen: new Date(),
        sales_id: identity?.id,
        status: "cold",
        tags: [],
      })}
    >
      <Box mt={2} display="flex">
        <Box flex="1">
          <Form>
            <Card>
              <CardContent>
                <Box>
                  <Box display="flex">
                    <Box mr={2}>
                      <Avatar />
                    </Box>
                    <ContactInputs />
                  </Box>
                </Box>
              </CardContent>
              <Toolbar />
            </Card>
          </Form>
        </Box>
      </Box>
    </CreateBase>
  );
};
