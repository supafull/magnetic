import BusinessIcon from "@mui/icons-material/Business";
import { Avatar, Box, CardContent, Stack } from "@mui/material";
import { Create, Form, Toolbar } from "react-admin";

import { CompanyForm } from "./CompanyForm";

export const CompanyCreate = () => (
  <Create actions={false} redirect="show">
    <Form>
      <CardContent>
        <Stack direction="row">
          <Avatar sx={{ mt: 1 }}>
            <BusinessIcon />
          </Avatar>
          <Box ml={2} flex="1" maxWidth={796}>
            <CompanyForm />
          </Box>
        </Stack>
      </CardContent>
      <Toolbar />
    </Form>
  </Create>
);
