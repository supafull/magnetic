import ContactsIcon from "@mui/icons-material/AccountCircle";
import DealIcon from "@mui/icons-material/MonetizationOn";
import { Box, Link as MuiLink, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { SelectField, useCreatePath, useRecordContext } from "react-admin";
import { Link } from "react-router-dom";

import { CompanyAvatar } from "./CompanyAvatar";
import { sectors } from "./sectors";
import { Companies } from "../generated/client";
import { useLiveQuery } from "electric-sql/react";
import { electric } from "../ra-data-electric";

export const CompanyCard = (props: { record?: Companies }) => {
  const [elevation, setElevation] = useState(1);
  const createPath = useCreatePath();
  const record = useRecordContext<Companies>(props);

  // Highly contrived examples of using live queries
  const { results: deals } = useLiveQuery(
    electric.db.deals.liveMany({ where: { company_id: record.id } })
  );
  const { results: contacts } = useLiveQuery(
    electric.db.contacts.liveMany({ where: { company_id: record.id } })
  );
  if (!record) return null;

  return (
    <MuiLink
      component={Link}
      to={createPath({
        resource: "companies",
        id: record.id,
        type: "show",
      })}
      underline="none"
      onMouseEnter={() => setElevation(3)}
      onMouseLeave={() => setElevation(1)}
    >
      <Paper
        sx={{
          height: 200,
          width: 195,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "1em",
        }}
        elevation={elevation}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <CompanyAvatar />
          <Box textAlign="center" marginTop={1}>
            <Typography variant="subtitle2">{record.name}</Typography>
            <SelectField
              color="textSecondary"
              source="sector"
              choices={sectors}
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-around" width="100%">
          <Box display="flex" alignItems="center">
            <ContactsIcon color="disabled" sx={{ mr: 1 }} />
            <div>
              <Typography variant="subtitle2" sx={{ mb: -1 }}>
                {contacts?.length || 0}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {(contacts?.length || 0) > 1 ? "contacts" : "contact"}
              </Typography>
            </div>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <DealIcon color="disabled" sx={{ mr: 1 }} />
            <div>
              <Typography variant="subtitle2" sx={{ mb: -1 }}>
                {deals?.length || 0}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {(deals?.length || 0) > 1 ? "deals" : "deal"}
              </Typography>
            </div>
          </Box>
        </Box>
      </Paper>
    </MuiLink>
  );
};
