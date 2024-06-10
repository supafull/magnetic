import ControlPointIcon from "@mui/icons-material/ControlPoint";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { FormEvent, useState } from "react";
import {
  Identifier,
  useCreate,
  useGetList,
  useGetMany,
  useRecordContext,
  useUpdate,
} from "react-admin";

import { Contacts, Tags } from "../generated/client";
import { colors } from "../tags/colors";

export const TagsListEdit = () => {
  const record = useRecordContext<Contacts>();
  const [open, setOpen] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState(colors[0]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [disabled, setDisabled] = useState(false);
  const recordTags = record?.tags as Array<string>;
  const { data: allTags, isLoading: isLoadingAllTags } = useGetList<Tags>(
    "tags",
    {
      pagination: { page: 1, perPage: 10 },
      sort: { field: "name", order: "ASC" },
    }
  );
  const { data: tags, isLoading: isLoadingRecordTags } = useGetMany<Tags>(
    "tags",
    { ids: recordTags },
    {
      enabled: !!recordTags && recordTags.length > 0,
    }
  );
  const [update] = useUpdate<Contacts>();
  const [create] = useCreate<Tags>();

  const unselectedTags =
    allTags && allTags.filter((tag) => !recordTags.includes(tag.id));

  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteTag = (id: Identifier) => {
    const tags: Identifier[] = recordTags.filter(
      (tagId: Identifier) => tagId !== id
    );
    update("contacts", {
      id: record.id,
      data: { tags },
      previousData: record,
    });
  };

  const handleAddTag = (id: Identifier) => {
    const tags: Identifier[] = [...recordTags, id];
    update("contacts", {
      id: record.id,
      data: { tags },
      previousData: record,
    });
    setAnchorEl(null);
  };

  const handleOpenCreateDialog = () => {
    setOpen(true);
    setAnchorEl(null);
    setDisabled(false);
  };

  const handleNewTagNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewTagName(event.target.value);
  };

  const handleCreateTag = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisabled(true);
    create(
      "tags",
      { data: { name: newTagName, color: newTagColor } },
      {
        onSuccess: (tag) => {
          update(
            "contacts",
            {
              id: record.id,
              data: { tags: [...recordTags, tag.id] },
              previousData: record,
            },
            {
              onSuccess: () => {
                setNewTagName("");
                setNewTagColor(colors[0]);
                setOpen(false);
              },
            }
          );
        },
      }
    );
  };

  if (isLoadingRecordTags || isLoadingAllTags) return null;
  return (
    <>
      {tags?.map((tag) => (
        <Box mt={1} mb={1} key={tag.id}>
          <Chip
            size="small"
            variant="outlined"
            onDelete={() => handleDeleteTag(tag.id)}
            label={tag.name}
            style={{ backgroundColor: tag.color, border: 0 }}
          />
        </Box>
      ))}
      <Box mt={1}>
        <Chip
          icon={<ControlPointIcon />}
          size="small"
          variant="outlined"
          onClick={handleOpen}
          label="Add tag"
          color="primary"
        />
      </Box>
      <Menu open={Boolean(anchorEl)} onClose={handleClose} anchorEl={anchorEl}>
        {unselectedTags?.map((tag) => (
          <MenuItem key={tag.id} onClick={() => handleAddTag(tag.id)}>
            <Chip
              size="small"
              variant="outlined"
              label={tag.name}
              style={{
                backgroundColor: tag.color,
                border: 0,
              }}
              onClick={() => handleAddTag(tag.id)}
            />
          </MenuItem>
        ))}
        <MenuItem onClick={handleOpenCreateDialog}>
          <Chip
            icon={<EditIcon />}
            size="small"
            variant="outlined"
            onClick={handleOpenCreateDialog}
            color="primary"
            label="Create new tag"
          />
        </MenuItem>
      </Menu>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleCreateTag}>
          <DialogTitle id="form-dialog-title">Create a new tag</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              label="Tag name"
              fullWidth
              value={newTagName}
              onChange={handleNewTagNameChange}
              sx={{ mt: 1 }}
            />
            <Box display="flex" flexWrap="wrap" width={230} mt={2}>
              {colors.map((color) => (
                <RoundButton
                  key={color}
                  color={color}
                  selected={color === newTagColor}
                  handleClick={() => {
                    setNewTagColor(color);
                  }}
                />
              ))}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={disabled}>
              Add tag
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

const RoundButton = ({ color, handleClick, selected }: any) => (
  <Box
    component="button"
    type="button"
    sx={{
      bgcolor: color,
      width: 30,
      height: 30,
      borderRadius: 15,
      border: selected ? "2px solid grey" : "none",
      display: "inline-block",
      margin: 1,
    }}
    onClick={handleClick}
  />
);
