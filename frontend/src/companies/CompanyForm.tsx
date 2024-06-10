import { Divider, Grid, Stack } from "@mui/material";
import {
  ImageField,
  ImageInput,
  ReferenceInput,
  SelectInput,
  TextInput,
  required,
} from "react-admin";

import { sectors } from "./sectors";
import { sizes } from "./sizes";

export function CompanyForm() {
  return (
    <>
      <TextInput source="name" validate={required()} fullWidth />
      <Stack direction="row">
        <SelectInput source="sector" choices={sectors} sx={{ width: 200 }} />
        <SelectInput source="size" choices={sizes} sx={{ ml: 2, width: 200 }} />
      </Stack>
      <Divider sx={{ mb: 2, width: "100%" }} />

      <TextInput source="address" fullWidth helperText={false} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextInput fullWidth source="city" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextInput fullWidth source="zipcode" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextInput fullWidth source="state_abbr" />
        </Grid>
      </Grid>
      <Divider sx={{ mb: 2, width: "100%" }} />

      <TextInput source="website" fullWidth helperText={false} />
      <TextInput source="linked_in" fullWidth helperText={false} />
      <ImageInput source="logo" label="Logo">
        <ImageField source="src" title="title" />
      </ImageInput>
      <Divider sx={{ mb: 2, width: "100%" }} />

      <Stack direction="row">
        <TextInput
          source="phone_number"
          helperText={false}
          sx={{ width: 200 }}
        />
        <ReferenceInput source="sales_id" reference="sales">
          <SelectInput
            label="Account manager"
            helperText={false}
            optionText={(sales: any) =>
              `${sales.first_name} ${sales.last_name}`
            }
            sx={{ width: 200, ml: 2 }}
          />
        </ReferenceInput>
      </Stack>
    </>
  );
}
