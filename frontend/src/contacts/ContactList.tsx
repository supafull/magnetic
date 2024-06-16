import {
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import { formatDistance } from "date-fns";
import {
  BulkActionsToolbar,
  BulkDeleteButton,
  CreateButton,
  ExportButton,
  Pagination,
  List as RaList,
  RecordContextProvider,
  ReferenceField,
  SimpleListLoading,
  SortButton,
  TextField,
  TopToolbar,
  useGetIdentity,
  useListContext,
} from "react-admin";
import { Link } from "react-router-dom";

import { Contacts } from "../generated/client";
import { Status } from "../misc/Status";
import { Avatar } from "./Avatar";
import { ContactListFilter } from "./ContactListFilter";
import { TagsList } from "./TagsList";

const ContactListContent = () => {
  const {
    data: contacts,
    isLoading,
    onToggleItem,
    selectedIds,
  } = useListContext<Contacts>();
  if (isLoading) {
    return <SimpleListLoading hasLeftAvatarOrIcon hasSecondaryText />;
  }
  const now = Date.now();

  return (
    <>
      <BulkActionsToolbar>
        <BulkDeleteButton />
      </BulkActionsToolbar>
      <List>
        {contacts.map((contact) => (
          <RecordContextProvider key={contact.id} value={contact}>
            <ListItem
              button
              component={Link}
              to={`/contacts/${contact.id}/show`}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selectedIds.includes(contact.id)}
                  tabIndex={-1}
                  disableRipple
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleItem(contact.id);
                  }}
                />
              </ListItemIcon>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText
                primary={`${contact.first_name} ${contact.last_name}`}
                secondaryTypographyProps={{
                  component: "div",
                }}
                secondary={
                  <>
                    {contact.title} at{" "}
                    <ReferenceField
                      source="company_id"
                      reference="companies"
                      link={false}
                    >
                      <TextField source="name" />
                    </ReferenceField>{" "}
                    <TagsList />
                  </>
                }
              />
              <ListItemSecondaryAction>
                <Typography variant="body2" color="textSecondary">
                  last activity{" "}
                  {formatDistance(new Date(contact.last_seen), now)} ago{" "}
                  <Status status={contact.status} />
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
          </RecordContextProvider>
        ))}
      </List>
    </>
  );
};

const ContactListActions = () => (
  <TopToolbar>
    <SortButton fields={["last_name", "first_name", "last_seen"]} />
    <ExportButton />
    <CreateButton
      variant="contained"
      label="New Contact"
      sx={{ marginLeft: 2 }}
    />
  </TopToolbar>
);

export const ContactList = () => {
  const { identity } = useGetIdentity();
  return identity ? (
    <RaList
      actions={<ContactListActions />}
      aside={<ContactListFilter />}
      perPage={25}
      pagination={<Pagination rowsPerPageOptions={[10, 25, 50, 100]} />}
      filterDefaultValues={{ sales_id: identity?.id }}
      sort={{ field: "last_seen", order: "DESC" }}
    >
      <ContactListContent />
    </RaList>
  ) : null;
};
